// ``````Updating the burger from a state of not being devoured, to then being devoured
//sending the put request to the backend to have the value changed
$(function () {
    $(".change-state").on("click", function (event) {
        //creating variable for burger id and the value

        var id = $(this).data("id");
        var newState = $(this).data("newstate");

        var newEatenState = {
            devour: newState
        };

        // console.log("test1", newEatenState);

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(function () {
            //   console.log("Changed burger to", newState);
            location.reload();
        });
    });

    //``````Taking user's input for a burger name when add/("submit") button is clicked`````

    // then sending a post request to the backend to update burger page with new burger
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        // console.log ("Submitted successfully") used to determine if submit is working

        //creating a variable to hold the user's burger
        var newBurger = {
            name: $("#burger").val().trim()
        };

        //console.log("test2", newBurger); testing the value of newBurger variable

        //sending the POST response for new burger
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Created new burger");
            location.reload();
        })
    });
    //sending request to delete a burger using id
    $(".delete-burger").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});