// Звук
function soundClick() {
    /*h6:hover span {*/
    var audio = new Audio();
    audio.src = 'img/cat.mp3';
    audio.autoplay = true;
}

// Прокрутка страницы вверх и вниз
const arrows = function() {
    const btnUp = document.getElementById('scrollUp');
    const btnDown = document.getElementById('scrollDown');
    const elem = document.documentElement;
    const indent = 50;
    scrollUp.hidden = (scrollY < indent);
    scrollDown.hidden = (scrollY > (elem.scrollHeight - innerHeight - indent));
    // Прокрутка вверх-вниз
    btnUp.onclick = () => window.scroll({ top: 0, behavior: "auto" });
    btnDown.onclick = () => window.scroll({ top: (elem.scrollHeight - innerHeight), behavior: "auto" });
    // Показать-спрятать кнопки
    window.addEventListener('scroll', function() {
        scrollUp.hidden = (scrollY < indent);
        scrollDown.hidden = (scrollY > (elem.scrollHeight - innerHeight - indent));
        // console.log((elem.scrollHeight - innerHeight) + " " + scrollY)
    })
}
arrows()
/*
// Прокрутка страницы вверх и вниз jquery
let forAll = 150
if ($(window).scrollTop() > forAll) $("#scrollUp").fadeIn('slow')
else $("#scrollUp").fadeOut('slow');
$(window).scroll(function() {
    if ($(window).scrollTop() < forAll) $("#scrollUp").fadeOut('slow');
    else $("#scrollUp").fadeIn('slow');
});

if ($(window).scrollTop() + $(window).height() < $(document).height() - forAll) $("#scrollDown").fadeIn('slow');
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - forAll) $("#scrollDown").fadeOut('slow');
    else $("#scrollDown").fadeIn('slow');
});

$("#scrollUp").click(function(){$("html,body").animate({scrollTop: 0}, forAll)});
$("#scrollDown").click(function(){$("html,body").animate({scrollTop: $(document).height()}, forAll)});
*/

/*
// Кнопка прокрутки страницы вверх js
window.onload = function() {
let topBtn = document.getElementById('up');
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
window.onscroll = () => window.scrollY > 50 ? topBtn.style.opacity = 0.75 : topBtn.style.opacity = 0
}
*/