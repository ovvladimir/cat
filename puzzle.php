<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Личный сайт Кота</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

        <div id="header">
            <a href="http://kireineko.ru/litter-f-10-11-2016/" target="_blank">Моя семья</a> <span>/</span>
            <a href="загадки.html" class="link">Загадки</a> <span>/</span>
            <a href="угадайка.html" class="link">Угадай число</a> <span>/</span>
            <a href="index.html" class="link">Главная</a>         
        </div>

    <div id="content">

        <div id="center"><h1>Личный сайт Кота</h1></div>

        <div id="box">
                <img src="img/Домовой.jpg">
                <h2>Игра в загадки</h2>
                
            <?php
                    	echo '<br>';
                   /* if (isset($_GET['userAnswer1']) && isset($_GET['userAnswer2']) && isset($_GET['userAnswer3'])) { */
                    $сount = 0;
                    $userAnswer = $_GET["userAnswer1"];
                    $userAnswer = mb_strtolower($userAnswer, 'utf-8');
                    if ($userAnswer == "капуста" || $userAnswer == "капустка") {
                        echo "Ответ на первый вопрос верный";
                        $сount++;
                    } else {
                        echo "Ответ на первый вопрос неверный";
                    }
                        echo '<br>';
                    $userAnswer = $_GET["userAnswer2"];
                    $userAnswer = mb_strtolower($userAnswer, 'utf-8');
                    if ($userAnswer == "лампа" || $userAnswer == "лампочка") {
                        echo "Ответ на второй вопрос верный";
                        $сount++;
                    } else {
                        echo "Ответ на второй вопрос неверный";
                    }
                        echo '<br>';
                    $userAnswer = $_GET["userAnswer3"];
                    $userAnswer = mb_strtolower($userAnswer, 'utf-8');
                    if ($userAnswer == "замок") {
                        echo "Ответ на третий вопрос верный";
                        $сount++;
                    } else {
                        echo "Ответ на третий вопрос неверный";
                    }
                        echo '<br><br>';
                    echo "Количество правильных ответов: " . $сount;
               /* } */
            ?>    
        </div>

        <div class="clear"></div>

    </div>

        <div id="footer">Copyright © 2017 <a href="#">KOT</a></div>
</body>
</html>