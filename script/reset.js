const request = require('request');
const _ = require('lodash');

function deleteSession(id) {
  request.delete({
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: 'https://bcbk-api.herokuapp.com/sessions/' + id,
  }, function(err, res, body) {
    console.log(err, res.statusCode, body);
  })
}

request.get({
  url: 'https://bcbk-api.herokuapp.com/sessions/',  
}, function(err, res, body) {
  const sessions = JSON.parse(body);
  _.map(sessions, function(session) {
    deleteSession(session._id)
  })
});


