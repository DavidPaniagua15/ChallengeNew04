function printHighscores() {
//getting scores from localstorage or set to empty array//    
    var highscores = JSON.parse(Window.localStorage.getItem('highscores')) || [];

//higscores in descending order//
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highscores.length; i += 1) {
//creating a (li) tag for each high score//
        var liTag = document.createElement('li');
        liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

//displaying highscores on page//
        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

