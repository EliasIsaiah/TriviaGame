//trivia
$(document).ready(function () {


    const game = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        answersDOM: $("div.answers"),
        incorrectAnswersDOM: $("div.incorrectAnswers"),
        currentQuestion: "",
        currentQuestionDOM: $("div.currentQuestion"),
        questions: null,
        // counter: null,
    }

    const timer = {
        //stolen from stopwatch activity
        incrementor: null,
        time: 0,
        currentTime: null,

        start: function () {

            if (this.incrementor) {
                this.incrementor = setTimeout(this.count, 1000);
            }
        },

        stop: function () {
            clearTimeout(this.incrementor);
        },

        count: function () {
            this.time++;
            this.currentTime = this.timeConverter(time);
            $("div.timer").text(this.currentTime);

            this.start();
        },

        timeConverter: function (t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        },
    }

    $.getJSON("https://opentdb.com/api.php?amount=10&category=20&type=multiple", function (data) {
        game.questions = data.results;
        // questions = questions.results;
        console.log("success", data)
        console.log(game.questions)
    });

    $("div.timer").on("click", function (event) {
        timer.incrementor = setTimeout(timer.count, 1000);
        timer.start();
        console.log("timer clicked!")
    })
});