$(document).ready(function () {

    let triviaData;
    let triviaLength;
    let currentQuestion = 0;
    let currentAnswerSet;

    $.getJSON("https://opentdb.com/api.php?amount=10&category=20&type=multiple", function (data) {
        triviaData = data.results;
        triviaLength = triviaData[currentQuestion].incorrect_answers.length + 1;
        console.log("success", data);
        console.log(triviaData);
    });

    const game = {
        correctAnswers: 0,
        incorrectAnswers: 0,

        answersDOM: $("div.answers"),
        incorrectAnswersDOM: $("div.incorrectAnswers"),
        timerDOM: $("div.timer"),


        currentQuestion: 0,
        currentQuestionDOM: $("div.currentQuestion"),


        buildanswerDOM: function () {
            if ($("div.answers div").length < 1) {
                for (i = 0; i < triviaLength; i++) {
                    // let imageUrl = "./assets/images/truffle" + i + ".png";
                    // let answer = $("<div>");
                    let answer = $("div.answer" + i);
                    answer
                        // .attr("type", "button")
                        // .attr("class", "answer" + i + " btn btn-primary btn-lg btn-block p-2 m-1")
                        // .attr("value", i)
                        // .css({
                        //     'color': '#ffffff',
                        //     'background': '#000000',
                        // });
                        // .css("display", "block");/
                    // answer.text("Presss Start");
                    // $("div.answers").append(answer);
                }
            }

            this.assignDOMData();
        },

        assignDOMData: function () {
            $question = $("div.currentQuestion");

            let currentAnswerSet = triviaData[currentQuestion].incorrect_answers;

            currentAnswerSet.push(triviaData[currentQuestion].correct_answer);

            console.log(`current answer set: ${currentAnswerSet}`);

            currentAnswerSet = currentAnswerSet.sort(() => { return 0.5 - Math.random() });

            console.log(currentAnswerSet);

            for (let i = 0; i < triviaLength; i++) {
                let $current = $("div.answer" + i);
                $current.text(currentAnswerSet[i]);
                $current.attr("value", currentAnswerSet[i]);
            }

            $question.text(triviaData[currentQuestion].question);
        },

        incorrectFeedback: function () {
            this.timerDOM.text(`Incorrect Answer! The correct answer is: ${triviaData[currentQuestion].correct_answer}`);
            currentQuestion++;
        }
    }

    const timer = {
        //stolen from stopwatch activity
        currentTime: null,
        timerRunning: false,
        intervalId: null,
    }

    let time = 5;

    function start() {
        if (time <= 0) {
            stop();
            game.incorrectAnswers++;
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

        game.buildanswerDOM();
        // console.log("timer clicked!");
    })

    $("div.answers div").on("click", function (event) {
        $this = $(this);
        console.log($this);

        if($this.attr("value") === triviaData[currentQuestion].correct_answer ) {
            console.log("This is the correct answer");
            game.correctAnswers++;
        } else {
            console.log("this is the wrong answer");
            game.incorrectAnswers++;
            setTimeout(game.incorrectFeedback(), 3000);
            game.assignDOMData();
            // currentQuestion++;
        }

    });

});