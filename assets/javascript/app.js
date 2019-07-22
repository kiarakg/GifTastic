$(document).ready(function() {

    // Initial array of characters
    var topics = ["Jon Snow", "Sansa Stark", "Arya Stark", "Tyrion Lannister", "Hodor", "Daenerys Targaryen", "Cersei Lannister", "Tormund Giantsbane", "Walder Frey", "Drogon"];

    function displayCharacterInfo() {
        
        var gameOfThrones = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameOfThrones + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific character button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;

             // Empties the div before adding more gifs
             $('#character-view').empty();
             for (var j = 0; j < results.length; j++) {
                 var imageDiv = $('<div>');
                 var imageView = results[j].images.fixed_height.url;
                 var still = results[j].images.fixed_height_still.url;
 
                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                 gifImage.attr('data-state', 'still');
                 $('#character-view').prepend(gifImage);
                 gifImage.on('click', playGif);
 
                // Pulling ratings for each character
                var rating = results[j].rating;
                var displayRated = $('<p>').text("Rating: " + rating);
                
                $('#character-view').prepend(displayRated);
             }

             // Function to stop and animate gifs
            function playGif() {
                var state = $(this).attr('data-state');
                // console.log(state);

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
                
            } // end of on click function
         });
    }


    // Function for displaying character data
    function renderButtons(){
        // Deletes the characters prior to adding new characters(otherwise you'll have repeat buttons)
        $('#buttons-view').empty();

        // Loops through the array of characters
        for (var i = 0; i < topics.length; i++) {
            // Create all buttons
            var a = $("<button>");
            a.addClass("game-of-thrones");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add character button is clicked
    $("#add-character").on("click", function(event) {
        event.preventDefault();
        // Grabs the input from the textbox
        var character = $("#character-input").val().trim();
        // The character from the textbox is then added to our array
        topics.push(character);
        // Handles the processing of our character array
        renderButtons();
            
    }); 

    // Adding click event listeners to all elements with a class of "game-of-thrones"
     $(document).on("click", ".game-of-thrones", displayCharacterInfo);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();

});
