//var of the quiz state //
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// DOM elements var //
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
//start creen hiden //
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

// showing screen action //
questionsEl.removeAttribute('class');

//timer//
timerId = setInterval(clockTick, 1000);

//starting timer//
timerEl.textContent = time;

getQuestion();
}

function getQuestion() {
//getting the questions from array//


    var currentQuestion = questions[currentQuestionIndex];

//question title updated //
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
   
//clearing out old question//
    choicesEl.innerHTML = '';

//loop//
    for (var i = 0; i < currentQuestion.choices.length; i++) {

//new button for choice//
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice)

    choiceNode.textContent = i + 1 + '. ' + choice;

//display//
    choicesEl.appendChild(choiceNode);
    }

}

function questionClick(event) {
    var buttonEl = event.target;

//if the click is not the right choice, do nothing//
    if (!buttonEl.matches('.choice')) {
        return;
    }

//check if user choose a wrong option//
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        
//penalize time//
    time -= 15;

    if(time < 0) {
        time = 0;
    }

//new time on display, new page//
    timerEl.textContent =  time;
    feedbackEl.textContent = 'Wrong!';
} else {
    feedbackEl.textContent = 'Correct!';
}
//flash right / wrong feedback//
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

//moving to next question//
    currentQuestionIndex++;

//checking if we are out of question//
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
//stop timer//
    clearInterval(timerId);

//showing end screen//
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

//final score//
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

//hide question section//
    questionsEl.setAttribute('class', 'hide');
}

function clockTick () {

//time updated//
    time--;
    timerEl.textContent = time;

//check if user ran out of time//
    if (time <= 0) {
        quizEnd();
    }
}


    function saveHighscore() {
//input box value//
    var initials = initialsEl.value.trim();
//make sure value wasn't empty//
    if (initials !== '') {
//get saved scores from localstorage, if not set to empty array//
        var highscores =
            JSON.parse(window.localStorage.getItem('highscores')) || [];

//set a new scored for current user//
        var newScore = {
            score: time,
            initials: initials,
        };

//save to localstorage//
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

//new next page//
        window.location.href = 'scores.html';
    }
}

function checkForEnter(event) {
// enter key //
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

//button to submit initials//
submitBtn.onclick = saveHighscore;

//button to start quiz//
startBtn.onclick = startQuiz;

//click on elements for the choices//
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;