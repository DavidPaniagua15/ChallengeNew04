//var of the quiz state //
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timeId;

// DOM elements var //
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

//start creen hiden //
function startQuiz() {

    var startScreenEl =  document.getElementById('start-screen');
    startScreenEl.getAttribute('class', 'hide');

// showing screen action //
questionsEl.removeAttribute('class');

//timer//
timerId = setInterval(clockTIick, 1000);

//starting timer//
timerEl.textContent = time;

getQuestion();
}

//getting the questions from array//
funtion getQuestion() {

    var currentQuestion = questions[currentQuestionIndex];

//question title updated //
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
   
//clearing out old question//
    choicesEl.innerHTML = '';



}