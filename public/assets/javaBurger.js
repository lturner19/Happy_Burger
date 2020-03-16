$(function () {
    $(".change-state").on("click", function (event) {
        //creating variable for burger id
        var id = $(this).data("id");
        //creating variable for devour state of burger
        var newState = $(this).attr("data-newState");

        console.log(newState)
        //
        var newEatenState = {
            devour: newState
        };
        console.log(newEatenState);

        //sending a put request to the backend (updating burger page with new burger user creates)
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(
            function () {
                console.log("Changed burger to", newState);
                location.reload();
            }
        );
    });
    //information from the front end (index.handlebars)
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        
        console.log ("Submitted successfully") //used to determine if submit is working

        //creating a variable to hold the user's burger
        var newBurger = {
           name: $("#burger").val().trim()
        };
        console.log(newBurger);

        //sending the POST response for new burger
        $.ajax("/api/burgers", {
            type:"POST",
            data: newBurger
        }).then(function(){
            console.log("Created new burger");
            location.reload();
        })
    });
});