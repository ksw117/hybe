$(document).ready(function() {
    $('.gnb > ul > li > a').hover(function() {
        $('header').stop().animate({'background-color' : '#000'}, 200);
    }, function() {
        $('header').stop().animate({'background-color' : 'rgba(255, 255, 255, 0.1)'}, 200);
    });

    
});

