let correctAnswersCount = 0;

function askQuestion(textBoxId, answer) {
    let userAnswer = document.getElementById(textBoxId).value
    if (userAnswer.toLowerCase() == answer) {
        correctAnswersCount++;
    }
}
function playPuzzle() {
    correctAnswersCount = 0;
    askQuestion("userAnswer1", "капуста");
    askQuestion("userAnswer2", "лампа");
    askQuestion("userAnswer2", "лампочка");
    askQuestion("userAnswer3", "замок");

    document.getElementById("result").innerHTML = 
    "<p class='text-primary'>Количество правильных ответов: <span class='text-danger'>" + correctAnswersCount + "</span></p>"
}