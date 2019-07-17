// Initial array of movies
$(document).ready(function() {

    var topics = ["Jon Snow", "Sansa Stark", "Arya Stark", "Tyrion Lannister", "Hodor", "Daenerys Targaryen", "Cersei Lannister", "Tormund Giantsbane", "Walder Frey", "Drogon"];

    // Create topics array buttons
    function renderButtons(){
        $('#buttons-view').empty();

        for (var i = 0; i < topics.length; i++) {
            // Create all buttons
            var a = $('<button>');
            a.addClass('game-of-thrones');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
        }
    }

    renderButtons();

    // On button click
    $(document).on('click', '.game-of-thrones', function() {

        // new variable will log the text data from each button
        var gameOfThrones = $(this).html();
        // console.log(gameOfThrones);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameOfThrones + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL);

        // Creating an AJAX call for the specific character button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            var results = response.data;
            // console.log(results);
            
            // Empties the div before adding more gifs
            $('#character-view').empty();
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                    // console.log(imageView);

            var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                $('#character-view').prepend(gifImage);
                gifImage.on('click', playGif);

            // Pulling ratings for each character
            var rating = results[j].rating;
                // console.log(rating);
            var displayRated = $('<p>').text("Rating: " + rating);
            $('#character-view').prepend(displayRated);
            }
        });

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
            

    }); // end of document on click

           //adding new button to array
           $(document).on('click', '#add-character', function(){
            if ($('#character-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#character-input').val().trim();
            topics.push(character);
            $('#charcter-input').val('');
            renderButtons();
            return false;

            }

        });
});
