//trivia
$(document).ready(function () {

    let triviaData;
    let triviaLength;
    let currentQuestion = 0;

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
        
        
        currentQuestion: 0,
        currentQuestionDOM: $("div.currentQuestion"),

        buildanswerDOM: function () {
            if ($("div.answers div").length < 1) {
                for (i = 0; i < triviaLength; i++) {
                    // let imageUrl = "./assets/images/truffle" + i + ".png";
                    let answer = $("<div>");
                    answer
                        .attr("class", "col-12 my-1 answer") //+ i)
                        // .attr("value", i)
                        .css({
                            'color': '#ffffff',
                            'background': '#000000',
                        });
                    answer.text("text");
                    $("div.answers").append(answer);
                }
            }

            this.assignDOMData();
        },

        assignDOMData: function () {
            $question = $("div.currentQuestion");
            let $tempAnswers = this.triviaData[this.currentQuestion].incorrect_answers;
            $tempAnswers.push(this.triviaData[this.currentQuestion].correct_answer);
            console.log($tempAnswers);
        }
    }

    const timer = {
        //stolen from stopwatch activity
        incrementor: null,
        currentTime: null,
        timerRunning: false,
        intervalId: null,
    }

    let time = 5;

    let start = function () {

        if (!timer.timerRunning) {
            // timer.incrementor = setTimeout(timer.count, 1000);
            intervalId = setInterval(count, 1000);
            timer.timerRunning = true;
        }
    }

    let stop = function () {
        // clearTimeout(timer.incrementor);
        clearInterval(intervalId);
        clockRunning = false;
    }

    let count = function () {
        time--;
        timer.currentTime = timeConverter(time);
        $("div.timer").text(timer.currentTime);

        // start();
    }


    let timeConverter = function (t) {

        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (minutes === 0 && seconds === 0) {
            stop();
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (minutes === 0 && seconds === 0) {
            stop();
        }

        return minutes + ":" + seconds;
    }

    $("div.timer").on("click", function (event) {
        start();
        game.buildanswerDOM();
        // console.log("timer clicked!");
    })

    console.log("There should be somehting here");
});