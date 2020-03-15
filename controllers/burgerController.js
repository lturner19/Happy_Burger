//This controller file sets up the routes


var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/burgers", function(req, res) {
  // homepage loaded (select all data from database)

  burger.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {//create new burger(expecting name and something from the body from the front end)
  burger.create([
    "burger_name", "devour"//columns from database
  ], [
    req.body.name, req.body.devour//something coming from the front end/ found in public/js/cats.js (var newCat = {name: $(#ca).val().trim() sleep: $("[name = sleepy]")})
  ], function(result) {//my asynchrouous or use the callback method
    // Send back the ID of the new quote
    res.json({ id: result.insertId });//response sending to user
  });
});

router.put("/api/burgers/:id", function(req, res) {//updating 

  console.log("condition", condition);

  burger.update({//updating a burger
    devour: req.body.devour
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
