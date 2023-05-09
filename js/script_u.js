function play() {
var answer = parseInt(Math.random() * 100); // [0 - 1] * 100
console.log(answer) // подсказка в консоле F12

for (var user=1; user<=2; user++) {
    var userAnswer = prompt("Игрок №" + user + ", введите число от 0 до 100, для выхода нажмите q");
    if (userAnswer == "q") {
        location.reload(); break; // перезагрузка страницы
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
        /*alert("Игрок №" + user + ". Поздравляю, Вы угадали!");*/
        document.getElementById("result").innerHTML = 
        "<strong><p>Игрок №" + user + ". Поздравляю, Вы угадали!</p></strong>";
            break;
    } else {
        alert("Вы ошиблись. Необходимо ввести число.");
            --user; continue; // возврат, если введено не число
    } if (user == 2) {
    	   --user; --user;
    }
    }
}