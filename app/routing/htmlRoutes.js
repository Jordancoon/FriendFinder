var path = require("path");
var questions = require("../data/questions");


module.exports = function(app) {
  // Home
  app.get("/", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/pages/index.html"));
    res.render("index", { });
  });

  // Survey
  app.get("/survey", function(req, res) {
    res.render("survey",
    {
      questions: questions
    });
  });
};