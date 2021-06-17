const { DateTime } = require('luxon');

function getTime(fmt) {
let now = DateTime.fromObject({zone: 'America/New_York'});
  if (fmt == 24 || fmt == null) {
    let time = {
      hour: now.toFormat('H'),
      minute: now.toFormat('mm'),
      second: now.toFormat('ss'),
      millisecond: now.toFormat('SSS')
    }
    return time;
  }else if (fmt == 12) {
    let time = {
      hour: now.toFormat('hh'),
      meridiem: now.toFormat('a'),
      minute: now.toFormat('mm'),
      second: now.toFormat('ss'),
      millisecond: now.toFormat('SSS')
    }
    return time;
  }
}
function getDate(type) {
let now = DateTime.fromObject({zone: 'America/New_York'});
  if (type == 'short' || type == null) {
    let date = {
      month: now.toFormat('LL'),
      day: now.toFormat('dd'),
      year: now.toFormat('yyyy')
    }
    return date;
  }else if (type == 'long') {
    let date = {
      day: now.toFormat('d'),
      dayOfWeek: now.toFormat('cccc'),
      monthText: now.toFormat('LLLL'),
      monthNumber: now.toFormat('LL'),
      year: now.toFormat('yyyy'),
      week: now.toFormat('c'),
      quarter: now.toFormat('q')
    }
    return date;
  }
}
module.exports = { getTime, getDate }