//This controller file sets up the routes


var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // homepage loaded (select all data from database)

  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {//create new burger(expecting name and info from the body from the front end)
  burger.insertOne([
    "burger_name", "devour"//columns from database
  ], [
    req.body.name, req.body.devour//info coming from the front end/ found in public/js file
  ], function(result) {//can use asynchronous or use the callback method
    // Send back the ID of the new quote
    res.json({ id: result.insertId });//response sending to user
  });
});

router.put("/api/burgers/:id", function(req, res) {//updating 
var condition = "id = "+req.params.id

  console.log("condition", condition);

  //console.log(req.body.devour) used to determine value of condition

  burger.updateOne({//updating a burger
    //conditional ternary operator = condition ? expression to execute if condition truthy : expression to execute if condition is falsy 
    devour: req.body.devour ===0 ? false : true 

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
