var friends = require("../data/friends");

module.exports = function(app) {

  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------
  app.post("/api/new", function(req, res) {
    findFriend(req.body, function(match) {
      // We should push this only after we've made a match — otherwise, the friend
      // will match with itself, So we created our own callback. FANCY!
      friends.push(req.body);
      res.json(match);
    });
  });
}; // end export

function findFriend(currentFriend, callback) {
  // convert string score values to integers
  // See https://stackoverflow.com/a/4438423/3424316
  var currentFriendScores = currentFriend.scores.map(function(x) {
    return parseInt(x, 10);
  });

  var previousTotalDifference = 1000;
  var match;

  for (var i = 0; i < friends.length; i++) {
    var totalDifference = 0;
    for (var j = 0; j < friends[i].scores.length; j++) {
      totalDifference += Math.abs(friends[i].scores[j] - currentFriendScores[j]);
    }
    console.log(totalDifference);
    if (totalDifference < previousTotalDifference) {
      previousTotalDifference = totalDifference;
      match = friends[i];
    }
  }
  console.log("The match is " + match.name);
  callback(match);
  return match;
}