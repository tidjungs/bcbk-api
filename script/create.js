const request = require('request');
const _ = require('lodash');

const rooms = ["17201", "17302", "17303", "17304", "17401", "17402"];
const starts = ["10:40", "11:10", "11:40", "13:00", "13:30", "14:00", "14:30", "15:35", "16:05", "16:35"];
const ends = ["11:05", "11:35", "12:05", "13:25", "13:55", "14:25", "14:55", "16:00", "16:30", "17:00"];

_.map(rooms, room => {
  _.map(starts, (start, index) => {
    const payload = {
      name: "",
      speaker: "",
      start: "2017-11-26 " + start,
      end: "2017-11-26 " + ends[index],
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
