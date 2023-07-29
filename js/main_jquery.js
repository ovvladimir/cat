// Прокрутка страницы вверх и вниз jquery
let forAll = 100
if ($(window).scroll() > forAll) $("#scrollUp").fadeIn('slow');
$(window).scroll(function() {
    if ($(window).scroll() < forAll) $("#scrollUp").fadeOut('slow');
    else $("#scrollUp").fadeIn('slow');
});

if ($(window).scroll() + $(window).height() + forAll < $(document).height()) $("#scrollDown").fadeIn('slow');
$(window).scroll(function() {
    if ($(window).scroll() + $(window).height() + forAll > $(document).height()) $("#scrollDown").fadeOut('slow');
    else $("#scrollDown").fadeIn('slow');
});

$("#scrollUp").click(function(){$("html,body").animate({scrollTop: 0}, forAll)});
$("#scrollDown").click(function(){$("html,body").animate({scrollTop: $(document).height() - $(window).height()}, forAll)});