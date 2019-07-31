//trivia
$(document).ready(function () {

    let triviaData;
    let triviaLength;
    let currentQuestion = 0;
    let currentAnswerSet;
    const gameTime = 5;

    $.getJSON("https://opentdb.com/api.php?amount=10&category=20&type=multiple", function (data) {
        triviaData = data.results;
        triviaLength = triviaData[currentQuestion].incorrect_answers.length + 1;
        console.log("success", data);
        console.log(triviaData);
    });

    const game = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        gameIsRunning: false,

        answersDOM: $("div.answers p"),
        incorrectAnswersDOM: $("div.incorrectAnswers p"),
        correctAnswersDOM: $("div.correctAnswers p"),
        timerDOM: $("div.timer"),


        currentQuestionDOM: $("div.currentQuestion"),


        buildanswerDOM: function () {
            if ($("div.answers div").length < 1) {
                for (i = 0; i < triviaLength; i++) {
                    let imageUrl = "./assets/images/truffle" + i + ".png";
                    let answer = $("<div>");
                    answer
                        .attr("type", "button")
                        .attr("class", "answer" + i + " btn btn-primary btn-lg btn-block p-2 m-1")
                        .css({
                            'color': '#ffffff',
                            'background': '#000000',
                            'display': "block",
                        });
                    answer.text("Press Start");
                    $("div.answers").append(answer);
                }
            }
            game.assignDOMData();
        },

        assignDOMData: function () {
            $question = $("div.currentQuestion").empty();

            let currentAnswerSet = triviaData[currentQuestion].incorrect_answers;

            currentAnswerSet.push(triviaData[currentQuestion].correct_answer);

            currentAnswerSet = currentAnswerSet.sort(() => { return 0.5 - Math.random() });

            console.log(`current answer set: ${currentAnswerSet}`);

            for (let i = 0; i < triviaLength; i++) {
                let $current = $("div.answer" + i);
                $current.text(currentAnswerSet[i]);
                $current.attr("value", currentAnswerSet[i]);
            }

            $question.text(triviaData[currentQuestion].question);

            console.log(`currentQuestion is ${currentQuestion}`);
            if (currentQuestion > 0) { start(); };
        },


        incorrectFeedback: function () {
            this.timerDOM.text(`Incorrect Answer! The correct answer was: ${triviaData[currentQuestion].correct_answer}`);
            currentQuestion++;
            this.incorrectAnswers++;
            this.incorrectAnswersDOM.text(`Incorrect Answers: ${this.incorrectAnswers}`);
            $("div.answers").empty();
        },

        correctFeedback: function () {
            this.timerDOM.text(`Correct Answer!`);
            currentQuestion++;
            this.correctAnswers++;
            this.correctAnswersDOM.text(`Correct Answers: ${this.correctAnswers}`);
            $("div.answers").empty();
        },

        outOfTimeFeedback: function () {
            this.timerDOM.text(`You Ran out of Time! The correct answer was: ${triviaData[currentQuestion].correct_answer}`);
            currentQuestion++;
            this.incorrectAnswers++;
            this.incorrectAnswersDOM.text(`Incorrect Answers: ${this.incorrectAnswers}`);
            $("div.answers").empty();
        }
    }

    const timer = {
        //stolen from stopwatch activity
        currentTime: null,
        timerRunning: false,
        intervalId: null,
    }

    let time = gameTime;

    function start() {

        if (currentQuestion >= 10) {
            game.gameIsRunning = false;
            stop();
            return;
        }
        if (time < 1) {
            console.log("reached stop if");
            stop();
            game.outOfTimeFeedback();
            time = gameTime;
            setTimeout(game.buildanswerDOM, 3000);
            return;
        }
        count();
        timer.intervalId = setTimeout(start, 1000);
        console.log(time);
    }

    let stop = function () {
        // clearTimeout(timer.incrementor);
        clearTimeout(timer.intervalId);
        // clockRunning = false;
    }

    let count = function () {
        time--;
        timer.currentTime = timeConverter(time);
        $("div.timer").text(timer.currentTime);
    }

    let timeConverter = function (t) {

        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

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
    }

    $("div.timer").on("click", function (event) {

        if (!timer.intervalId) {
            start();
        }
        console.log("timer clicked!");

        if (!game.gameIsRunning) {
            game.buildanswerDOM();
            game.gameIsRunning = true;
        }
        // console.log("timer clicked!");
    })

    $(document).on("click", "div.answers div", function (event) {
        let $this = $(this);

        console.log($this);

        if ($this.attr("value") === triviaData[currentQuestion].correct_answer) {
            stop();
            game.correctFeedback();
            setTimeout(game.buildanswerDOM, 3000);
        } else {
            stop();
            game.incorrectFeedback();
            setTimeout(game.buildanswerDOM, 3000);
        }
    });
});