//trivia
$(document).ready(function () {
    let questions;

    $.getJSON("https://opentdb.com/api.php?amount=10&category=20&type=multiple", function (data) {
        questions = data;
        // $.each( data, function( key, val ) {
        //     questions.push(`key: ${key} val: ${val}`);
        //     console.log(key + " " + val);
        console.log("success", data)
        console.log(questions.results[0].question)
        });

    // $.ajax({
    //     type: "GET",
    //     url: "https://opentdb.com/api.php?amount=10&category=20&type=multiple",
    //     success: function(data) {
    //         console.log("success", data);
    //     }
    // })

});