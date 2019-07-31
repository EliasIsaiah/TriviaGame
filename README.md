# TriviaGame

This Trivia Game is an exhibition of my ability to use timeouts and api get requests in JavaScript.

The intended gameplay is to be as follows: 

    You'll create a trivia game that shows only one question until the player answers it or their time runs out.

    If the player selects the correct answer, show a screen congratulating them for choosing the right option. 
    After a few seconds, display the next question -- do this without user input.

    The scenario is similar for wrong answers and time-outs.

    If the player runs out of time, tell the player that time's up and 
    display the correct answer. Wait a few seconds, then show the next question.

    If the player chooses the wrong answer, tell the player they selected 
    the wrong option and then display the correct answer. Wait a few seconds, 
    then show the next question.

    On the final screen, show the number of correct answers, incorrect answers, 
    and an option to restart the game (without reloading the page).


### TODO:
* ~~Implement "restart game" button upon game end for the player to restart the game without having to reload the screen~~
* ~~implement endgame behavior as currently the game just ends unceremenoniously once there are no more questions to be answered, with no feedback beyond the "current question" div being empty~~
* The code needs some cleanup as there are some methods that have too much going on that should be broken up onto child methods or their functionaly should be absorbed into other existing methods as they are redundant.
* Further Formatting of the game's frontend design as the current design is barebones bootstrap
* Implement data validation on the data coming from the Trivia API to check for non-alphnumeric characters (Mostly for the " ' " character as currently it is not handled.
* ~~Implement the behavior of automatically moving the player to the next question after a few seconds after a timeout~~

