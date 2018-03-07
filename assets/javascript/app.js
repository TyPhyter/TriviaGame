
$(document).ready(function(){

    var secondsPerQuestion = 10;

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
                question : "The primary villains in the show, _______ is the name for the robots that threaten the human race:",
                answers : ["Pylons", "Cylons", "Nylons", "Cyclones"],
                correctAnswerIndex : 1,
            },

            {
                question : "This character from NBC's 'The Office' has a particular obsession with Battlestar Galactica:",
                answers : ["Kelly", "Andy", "Dwight", "Toby"],
                correctAnswerIndex : 2,
            },

            {
                question : "Hebrew for 'ground' or 'earth', _______ is the surname of three of the show's most important characters:",
                answers : ["Adama", "Baltar", "Bacalta", "Tigh"],
                correctAnswerIndex : 0,
            },

            {
                question : "Played by Katee Sackhoff in the reboot, this character was originally cast as a male:",
                answers : ["Helo", "Gaius Baltar", "Starbuck", "Apollo"],
                correctAnswerIndex : 2,
            },

            {
                question : "Described as a card game like poker in the original, _______ was a team sport combining basketball, squash, and lacrosse:",
                answers : ["Octogon", "Square", "Triad", "Pyramid"],
                correctAnswerIndex : 3,
            },

            {
                question : "In the classic series the Cylons were created by a reptilian race. In the reboot, however, they were created by:",
                answers : ["The Gods", "Humans", "A nuclear bomb", "Google"],
                correctAnswerIndex : 1,
            },

            {
                question : "Repeated throughout the series, this affirmative phrase was originally ad-libbed in the first episode by Edward James Olmos:",
                answers : ["Bangarang", "You're Darn Tootin'", "Long Live Charlie Sheen", "So Say We All"],
                correctAnswerIndex : 3,
            },

            {
                question : "Homophonic with a controversial oil drilling method, this word served as the sensor-safe expletive in the original and the reboot:",
                answers : ["Smelt", "Mine", "Frak", "Jack"],
                correctAnswerIndex : 2,
            },

            {
                question : "According to Number 6, how many humanoid Cylons are there?",
                answers : ["3", "5", "12", "42"],
                correctAnswerIndex : 2,
            },

            {
                question : "Named after a famous equine, the discovery of this ship revealed that the Galactica was not the only remaining Battlestar:",
                answers : ["Pegasus", "Black Beauty", "Seabiscuit", "Silver"],
                correctAnswerIndex : 0,
            },

        ],

        updateDisplay : function() {
            $("#play-area").html(`
                <img class="title" src="assets/images/battlestar_galactica_logo.png">
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
            
            this.secondsTimer = setInterval(function() {
                if(this.timeRemaining > 0) {
                    this.timeRemaining--;
                    console.log(this.timeRemaining);
                    this.updateTime();
                }
            }.bind(this), 1000);

            this.questionTimer = setTimeout(function() {
                this.showAnswer();
            }.bind(this), secondsPerQuestion*1000);

            this.updateDisplay();
            
        },

        nextQuestion : function() {

            this.selectedAnswerIndex = -1;
            this.currentQuestionIndex++;
            this.timeRemaining = secondsPerQuestion;

            clearTimeout(this.questionTimer);
            clearInterval(this.secondsTimer);
            
            this.secondsTimer = setInterval(function() {
                if(this.timeRemaining > 0) {
                    this.timeRemaining--;
                    console.log(this.timeRemaining);
                    this.updateTime();
                }
            }.bind(this), 1000);

            this.questionTimer = setTimeout(function() {
                this.showAnswer();
            }.bind(this), secondsPerQuestion*1000);

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
                <img class="title" src="assets/images/battlestar_galactica_logo.png">
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

        game.showAnswer();
        
    });

    game.newGame();

});

