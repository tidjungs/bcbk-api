const request = require('request');
const _ = require('lodash');

const rooms = ["17201", "17302", "17303", "17304", "17401", "17402"];
const starts = ["10:45", "11:15", "11:45", "13:00", "13:30", "14:00", "14:30", "15:20", "15:50", "16:20"];
const ends = ["11:10", "11:40", "12:10", "13:25", "13:55", "14:25", "14:55", "15:45", "16:15", "16:45"];

_.map(rooms, room => {
  _.map(starts, (start, index) => {
    const payload = {
      name: "",
      speaker: "",
      start: "2017-10-13 " + start,
      end: "2017-10-13 " + ends[index],
      room
    }
    request.post({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: 'https://bcbk-api.herokuapp.com/sessions',
      form: payload
    }, function(err, res, body) {
      console.log(err, res.statusCode, body);
    });
  });
});
