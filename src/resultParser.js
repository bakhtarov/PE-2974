module.exports = res => {
  const result = [];
  result.push(`Firing range is ${res.towerRange}m`);

  for (let i = 0; i < res.logs.length; i++) {
    let log = res.logs[i];

    if (log.hasOwnProperty('winner')) {
      let str = `${log.winner ? 'Tower' : 'Bots'} WON in ${i} turn(s)`;
      result.push(str);
      continue;
    }
    if (log.hasOwnProperty('delay')) {
      continue;
    }

    if (log.range <= 0) {
      result.push(`Turn ${i + 1}: Bot ${log.botName} defeats Tower`);
      continue;
    }

    result.push(`Turn ${i + 1}: Kill ${log.botName} at ${log.range}m`);
  }

  return result;
};
