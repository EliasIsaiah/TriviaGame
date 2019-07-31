//trivia
$(document).ready(function () {

    const numQuestions = 10;
    const gameTime = 20;

    let triviaData;
    let triviaLength;
    let currentQuestion = 0;
    let time = gameTime;

    const game = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        gameIsRunning: false,

        incorrectAnswersDOM: $("div.incorrectAnswers p"),
        correctAnswersDOM: $("div.correctAnswers p"),
        timerDOM: $("div.timer"),


        currentQuestionDOM: $("div.currentQuestion"),

        startGame: function () {
            start();
            this.buildanswerDOM();
            game.gameIsRunning = true;
        },

        buildanswerDOM: function () {

            if (currentQuestion > (numQuestions - 1)) {
                game.endGame();
                return;
            }
            if ($("div.answers div").length < 1) {
                for (i = 0; i < triviaLength; i++) {
                    let answer = $("<div>");
                    answer
                        .attr("type", "button")
                        .attr("class", "answer" + i + " btn btn-primary btn-lg btn-block p-2 m-1")
                        .css({
                            'color': '#ffffff',
                            'background': '#000000',
                            'display': "block",
                        });
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


            for (let i = 0; i < triviaLength; i++) {
                let $current = $("div.answer" + i);
                $current.text(currentAnswerSet[i]);
                $current.attr("value", currentAnswerSet[i]);
            }

            $question.text(triviaData[currentQuestion].question);

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
        },

        endGame: function () {
            this.gameIsRunning = false;
            $("div.answers").empty();
            this.currentQuestionDOM.empty();
            currentQuestion = 0;
            this.correctAnswers = 0;
            this.incorrectAnswers = 0;
            time = gameTime;
            clearTimeout(timer.intervalId);
            game.timerDOM.text("Click Here to Play Again");
        }
    }

    const timer = {
        //stolen from stopwatch activity
        currentTime: null,
        timerRunning: false,
        intervalId: null,
    }

    function start() {

        if (time < 1) {
            stop();
            game.outOfTimeFeedback();
            time = gameTime;
            setTimeout(game.buildanswerDOM, 3000);
            return;
        }
        count();
        timer.intervalId = setTimeout(start, 1000);
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

        if (!game.gameIsRunning) {

            $.getJSON(`https://opentdb.com/api.php?amount=${numQuestions}&category=20&type=multiple`, function () {
            }).then((data) => {
                triviaData = data.results;
                triviaLength = triviaData[currentQuestion].incorrect_answers.length + 1;
                game.startGame();
            });
        }
    })

    $(document).on("click", "div.answers div", function (event) {
        let $this = $(this);

        if ($this.attr("value") === triviaData[currentQuestion].correct_answer) {
            stop();
            time = gameTime;
            game.correctFeedback();
            setTimeout(game.buildanswerDOM, 3000);
        } else {
            stop();
            time = gameTime;
            game.incorrectFeedback();
            setTimeout(game.buildanswerDOM, 3000);
        }
    });
});

