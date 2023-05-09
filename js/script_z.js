    var correctAnswersCount = 0;

    function askQuestion(textBoxId, answer) {
        var userAnswer = document.getElementById(textBoxId).value
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
    "<strong><p>Количество правильных ответов: " + correctAnswersCount + "</p></strong>"
    }