function play() {
    const element = document.getElementById("result");
    const answer = parseInt(Math.random() * 100); // [0 - 1] * 100
    let userAnswer;
    let min = 0;
    let max = 100;
    let arr = [];
    let name = prompt("Как Вас зовут?");
    if (name == null) {name = "NoName"};
    // console.log(answer) // подсказка в консоле или F12

    for (let user=1; user<=2; user++) {
        if (user == 1) {
        userAnswer = prompt(name + ", введите число от 0 до 100");
        } else {
            function* range(s, e) { while (s <= e) yield s++ }
            arr = [...range(min, max)];
            userAnswer = arr[Math.floor(Math.random() * arr.length)];
            alert("Кот думает, что число " + userAnswer);
        }
        if (userAnswer == null) {
            location.reload(); break; // перезагрузка страницы и выход
        }
        userAnswer = parseInt(userAnswer);
        if (userAnswer > answer && userAnswer < 101) {
            alert("Ответ слишком большой");
            if (userAnswer <= max) {
                max = userAnswer - 1;
            }
        } else if (userAnswer > 100 || userAnswer < 0) {
            alert("Ошибка. Введите число от 0 до 100.");
                --user; continue; // возврат, если введено число больше 100
        } else if (userAnswer < answer) {
            alert("Ответ слишком маленький");
            if (userAnswer >= min) {
                min = userAnswer + 1;
            }
        } else if (userAnswer == answer) {
            if (user == 2) {
                name = "Кот"
            }
            alert("Поздравляю, " + name + "! Число угадано!");
            element.innerHTML = "<p>Хорошая игра!</p>";
            break;
        } else {
            alert("Ошибка. Необходимо ввести число.");
                --user; continue; // возврат, если введено не число
        } if (user == 2) {
            --user; --user;
        }
    }
}