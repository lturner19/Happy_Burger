$(function () {
    $(".change-state").on("click", function (event) {
        var id = $(this).data("id");
        var newState = $(this).attr("data-newState");
        console.log(newState)
        var newEatenState = {
            devour: newState
        };

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
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        alert("Submitted successfully")
        var newBurger = {
            name: $("#burger").val().trim(),
            devour: $("[name = devoured]:checked").val().trim()
        };
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