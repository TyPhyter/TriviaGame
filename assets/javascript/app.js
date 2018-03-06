// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option.
// After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. 
//Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).
var secondsPerQuestion = 30;

var game = {

    correctAnswers : 0,
    incorrectAnswers : 0,
    currentQuestionIndex: 0,
    selectedAnswerIndex: -1,
    timeRemaining: secondsPerQuestion,
    questionTimer: null,
    secondsTimer: null,


    questions : [
        {
            question : "Question Text",
            answers : ["wrong", "right", "wrong", "wrong"],
            correctAnswerIndex : 1,
        },

        {
            question : "Another Question Text",
            answers : ["wrong", "wrong", "wrong", "right"],
            correctAnswerIndex : 3,
        },
    ],

    updateDisplay : function() {
        $("#play-area").html(`
            <h1 class="title">TRIVIA TITLE</h1>
            <div id="time-remaining">Time remaining: ${this.timeRemaining}</div>
            <div id="question-text">${this.questions[this.currentQuestionIndex].question}</div>
            <div class="list-container">
                <ul id="answer-list">
                    <li class="answer" data-index="0">${this.questions[this.currentQuestionIndex].answers[0]}</li>
                    <li class="answer" data-index="1">${this.questions[this.currentQuestionIndex].answers[1]}</li>
                    <li class="answer" data-index="2">${this.questions[this.currentQuestionIndex].answers[2]}</li>
                    <li class="answer" data-index="3">${this.questions[this.currentQuestionIndex].answers[3]}</li>
                </ul>
            </div>
        `);
    },

    updateTime : function() {
        $("#time-remaining").text(`Time remaining: ${this.timeRemaining}`);
    },

    newGame : function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.currentQuestionIndex = 0;
        this.selectedAnswerIndex = -1;

        this.questionTimer = setTimeout(function() {
            this.nextQuestion();
        }.bind(this), secondsPerQuestion*1000);
        
        this.secondsTimer = setInterval(function() {
            if(this.timeRemaining > 0) {
                this.timeRemaining--;
                console.log(this.timeRemaining);
                this.updateTime();
            }
        }.bind(this), 1000);

        this.updateDisplay();
        
    },

    nextQuestion : function() {

        this.selectedAnswerIndex = -1;
        this.currentQuestionIndex++;
        this.timeRemaining = secondsPerQuestion;

        clearTimeout(this.questionTimer);
        clearInterval(this.secondsTimer);

        this.questionTimer = setTimeout(function() {
            this.nextQuestion();
        }.bind(this), secondsPerQuestion*1000);
        
        this.secondsTimer = setInterval(function() {
            if(this.timeRemaining > 0) {
                this.timeRemaining--;
                console.log(this.timeRemaining);
                this.updateTime();
            }
        }.bind(this), 1000);

        this.updateDisplay();
    },

    showAnswer : function() {

        clearTimeout(this.questionTimer);
        clearInterval(this.secondsTimer);

        $(`li[data-index="${this.questions[this.currentQuestionIndex].correctAnswerIndex}"]`).addClass("correct");
        if(this.selectedAnswerIndex != this.questions[this.currentQuestionIndex].correctAnswerIndex) {
            $(`li[data-index="${this.selectedAnswerIndex}"`).addClass("incorrect");
            this.incorrectAnswers++;
        } else {
            this.correctAnswers++;
        }

        if(this.currentQuestionIndex < this.questions.length-1){
            setTimeout(this.nextQuestion.bind(this), 3000);
        } else {
            setTimeout(this.endScreen.bind(this), 3000);
        }
    },

    endScreen : function () {
        $("#play-area").html(`
            <h1 class="title">TRIVIA TITLE</h1>
            <div class="answers-correct">Correct Answers: ${this.correctAnswers}</div>
            <div class="answers-incorrect">Incorrect Answers: ${this.incorrectAnswers}</div>
            <button class="new-game">Try Again?</button>
        `);

        $("button.new-game").on("click", function(){
            game.newGame();
        });
    },

}

$(document).on("click", ".answer", function() {
    game.selectedAnswerIndex = $(this).attr("data-index");
    if(parseInt(game.selectedAnswerIndex) === game.questions[game.currentQuestionIndex].correctAnswerIndex){
        console.log("correct!");
    } else {
        console.log("wrong!");
    } 

    game.showAnswer();
    
});

game.newGame();



