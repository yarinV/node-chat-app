const moment = require('moment');

var date = moment();
date.add(3, 'hour');
console.log(date.format('MMM Do, YYYY h:mm a'));
