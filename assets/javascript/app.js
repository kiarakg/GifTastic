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
    $(document).on('click', 'game-of-thrones', function() {

        // New variable will log the text data from each button
    }
}
