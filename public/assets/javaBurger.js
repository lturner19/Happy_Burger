// ``````Updating the burger from a state of not being devoured, to then being devoured
//sending the put request to the backend to have the value changed
$(function () {
    //``````Taking user's input for a burger name when add/("submit") button is clicked`````
    
   // then sending a post request to the backend to update burger page with new burger
   $(".create-form").on("submit", function(event) {
    event.preventDefault();
    
   // console.log ("Submitted successfully") used to determine if submit is working

    //creating a variable to hold the user's burger
    var newBurger = {
       name: $("#burger").val().trim()
    };
     
    //console.log("test2", newBurger); testing the value of newBurger variable

    //sending the POST response for new burger
    $.ajax("/api/burgers", {
        type:"POST",
        data: newBurger
    }).then(function(){
        console.log("Created new burger");
        location.reload();
    })
});

    $(".change-state").on("click", function () {
        //creating variable for burger id
       
        var id = $(this).data("id");
        //creating variable for devour state of burger
        var newState = !$(this).data("devour");
        var newEatenState = {
            devour: newState
        };

        
        
       $("button").hide();

        console.log("test1", newEatenState);
        
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(function () {
                
                console.log("Changed burger to", newState);
                location.reload();
            }
        );
    });

});