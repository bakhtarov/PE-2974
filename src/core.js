module.exports = params => {
  const data = { ...params };

  let isTowerAlive = true;
  let isBotsExists = true;

  const destroyTower = bot => {
    data.logs = [...data.logs, { ...bot, winner: 0 }];
    isTowerAlive = false;
  };
  const botsDown = () => {
    data.logs = [...data.logs, { winner: 1 }];
    isBotsExists = false;
  };

  const getBotsRange = () => data.bots.map(bot => bot.range);
  const getBotByRange = range => data.bots.find(bot => bot.range === range);

  const getMinBotRange = () => {
    const botsRangeArray = getBotsRange();
    return botsRangeArray.length > 0 && Math.min(...botsRangeArray);
  };

  const checkRange = () => {
    if (data.bots.length <= 0) {
      botsDown();
      return;
    }
    const botsRangeArray = getBotsRange();
    const rangeDangerForTower = botsRangeArray.find(range => range <= 0);

    const botNearTower = getBotByRange(rangeDangerForTower);

    if (rangeDangerForTower <= 0) {
      destroyTower(botNearTower);
      return;
    }
  };

  const towerShot = () => {
    const { bots, towerRange } = data;
    const minBotRange = getMinBotRange();

    if (minBotRange > towerRange) {
      data.logs = [...data.logs, { delay: 1 }];
      return;
    }

    if (minBotRange <= 0) {
      return;
    }

    const botsOnSameMinRange = bots.filter(bot => bot.range === minBotRange);
    const minBotRangeStepArray = botsOnSameMinRange.map(bot => bot.step);
    const maxBotStep = Math.max(...minBotRangeStepArray);

    const outOfTargetBots = bot =>
      bot.range !== minBotRange || bot.step !== maxBotStep;
    const targetBot = bot =>
      bot.range === minBotRange && bot.step === maxBotStep;

    const botsAfterShot = bots.filter(outOfTargetBots);
    const killedBot = bots.find(targetBot);
    data.bots = botsAfterShot;
    data.logs = [...data.logs, killedBot];
  };

  const changeRange = () => {
    const minBotRange = getMinBotRange();

    if (minBotRange <= 0) {
      return;
    }

    data.bots = data.bots.map(bot => ({
      ...bot,
      range: bot.range - bot.step,
    }));
  };

  while (isTowerAlive && isBotsExists) {
    checkRange();
    towerShot();
    changeRange();
  }

  return data;
};
