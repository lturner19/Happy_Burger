//```````This controller file sets up the routes``````````

const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // homepage loaded (select all data from database)

  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
   // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//create new burger(expecting name and info from the body from the front end)
router.post("/api/burgers/", function(req, res) {
  burger.insertOne([
    "burger_name", "devour"//columns from database
  ], [
    req.body.name, req.body.devour//info coming from the front end/ found in public/js file
  ], function(result) {//can use asynchronous or use the callback method
    // Send back the ID of the new burger
    res.json({ id: result.insertId });//response sending to user
  });
});

//updating status of burger
//:id = placeholder
//using the id to identify specific burger and update its "state"
router.put("/api/burgers/:id", function(req, res) {
var condition = "id = "+ req.params.id;

 console.log("condition", condition);

  console.log(req.body.devour) //used to determine value of condition

  burger.updateOne({//updating one burger
     
    devour: true

  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//deleting a specific burger based on assigned id
//:id = placeholder
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
