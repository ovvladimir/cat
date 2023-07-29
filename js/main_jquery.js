// Прокрутка страницы вверх и вниз jquery
let forAll = 50
if ($(window).scrollTop() >= forAll) $("#scrollUp").fadeIn('slow');
$(window).scroll(function() {
    if ($(window).scrollTop() <= forAll) $("#scrollUp").fadeOut('slow');
    else $("#scrollUp").fadeIn('slow');
});

if ($(window).scrollTop() + $(window).height() <= $(document).height() - forAll) $("#scrollDown").fadeIn('slow');
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - forAll) $("#scrollDown").fadeOut('slow');
    else $("#scrollDown").fadeIn('slow');
});
$("#scrollUp").click(function(){$("html,body").animate({scrollTop: 0}, forAll)});
$("#scrollDown").click(function(){$("html,body").animate({scrollTop: $(document).height()}, forAll)});