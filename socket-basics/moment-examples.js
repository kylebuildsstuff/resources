var moment = require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('X'));  //seconds since jan 1 1970  (epoch time)
console.log(now.format('x'));  //milliseconds since jan 1 1970
console.log(now.valueOf());  //milliseconds since jan 1 1970 IN NUMBERS

var timestamp = 1451273050371;
var timestampMoment = moment.utc(now.valueOf()).local();

console.log(timestampMoment.format('h:mm a'))
