let correctAnswersCount = 0;

function askQuestion(textBoxId, answer) {
    let userAnswer = document.getElementById(textBoxId).value
    if (userAnswer.toLowerCase() == answer) {
        correctAnswersCount++;
    }
}
function playPuzzle() {
    correctAnswersCount = 0;
    askQuestion("userAnswer1", "Brython");
    askQuestion("userAnswer1", "brython");
    askQuestion("userAnswer2", "Bootstrap");
    askQuestion("userAnswer2", "bootstrap");
    askQuestion("userAnswer3", "html");
    askQuestion("userAnswer3", "css");
    askQuestion("userAnswer3", "javascript");

    document.getElementById("result").innerHTML = 
    "<p class='text-primary'>Количество правильных ответов: <span class='text-danger'>" + correctAnswersCount + "</span></p>"
}