//trivia
$(document).ready(function () {

    $.getJSON("https://opentdb.com/api.php?amount=10&category=20&type=multiple&token=9b8816051b67a694401133ed96f228e4d886fcb413e6b9b25450c10c60857a23", function (data) {
        var questions = [];
        $.each( data, function( key, val ) {
            questions.push(`key: ${key} val: ${val}`);
            console.log(key + " " + val);
        });
        
    });

});