function play() {
    const element = document.getElementById("result");
    let answer = parseInt(Math.random() * 100); // [0 - 1] * 100
    let userAnswer;
    console.log(answer) // подсказка в консоле или F12

    for (let user=1; user<=2; user++) {
        userAnswer = prompt("Игрок №" + user + ", введите число от 0 до 100");
        if (userAnswer == null) {
            location.reload(); break; // перезагрузка страницы и выход
        }
        userAnswer = parseInt(userAnswer);
        if (userAnswer > answer && userAnswer < 101) {
            alert("Ваш ответ слишком большой");
        } else if (userAnswer > 100 || userAnswer < 0) {
            alert("Вы ошиблись. Введите число от 0 до 100.");
                --user; continue; // возврат, если введено число больше 100
        } else if (userAnswer < answer) {
            alert("Ваш ответ слишком маленький");
        } else if (userAnswer == answer) {
            alert("Игрок №" + user + ". Поздравляю! Вы угадали!");
            element.innerHTML = "<p>Хорошая игра</p>";
            break;
        } else {
            alert("Вы ошиблись. Необходимо ввести число.");
                --user; continue; // возврат, если введено не число
        } if (user == 2) {
            --user; --user;
        }
    }
}