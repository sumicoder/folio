//トップに戻るときのアニメーション
$(function () {
    $('#top-btn').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 700);
        return false;
    });
});

// セクションまでのスクロール

$(function () {
    $(window).on('scroll', function () {
        var elem = $('.section--w1060');
        var fadeIn = 'fadeIn';
        elem.each(function () {
            var elemOffset = $(this).offset().top;
            var scrollPos = $(window).scrollTop();
            var wh = $(window).height();

            if (scrollPos > elemOffset - wh + (wh / 20)) {
                $(this).addClass(fadeIn);
            } else {
                $(this).removeClass(fadeIn);
            }
        });
    });
}());


// 対応するボタンのリストを表示する

$(function () {

    let $btn = document.getElementsByClassName('js-toggle-num');
    let $page = document.getElementsByClassName('js-news-list');
    $('.js-toggle').click(function () {
        let $clickedIndex = $('.js-toggle').index(this);
        for (let i = 0; i < $btn.length; i++) {
            $btn[i].classList.remove('is-black');
            $page[i].classList.remove('is-show');
        }
        $btn[$clickedIndex].classList.toggle('is-black');
        $page[$clickedIndex].classList.toggle('is-show');

    });

    $('.js-toggle-next').click(function () {

        let $displayPage = $('.is-show');
        let $isBlack = $('.is-black');
        let $displayNum = document.getElementsByClassName('is-black');
        let $btns = [].slice.call($btn);
        let $number = $btns.indexOf($displayNum[0]);
        if ($number == $btn.length-1) {
        }else{
            $isBlack.removeClass('is-black');
            $btn[$number + 1].classList.toggle('is-black');

            $displayPage.removeClass('is-show');
            $displayPage.next().addClass('is-show');
        }
    });
});



// ハンバーガーメニュー表示
$(function () {
    const menuBtn = document.querySelector('.js-menuBtn')
    const hamburger = document.querySelector('.js-hamburger')
    const menuIcon = document.querySelector('.js-menuIcon')
    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('is-show');
        hamburger.classList.toggle('is-show');
        menuIcon.classList.toggle('is-show');
    });
}());

//次へボタン　Progate

// function toggleChangeBtn() {
//     var slideIndex = $('.slide').index($('.active'));
//     $('.change-btn').show();
//     if (slideIndex == 0) {
//         $('.prev-btn').hide();
//         // 「3」の部分を、lengthメソッドを用いて書き換えてください
//     } else if (slideIndex == $('.slide').length - 1) {
//         $('.next-btn').hide();
//     }
// }

// $(function () {
//     $('.l-news__toggle--item').click(function () {
//         $('.is-black').removeClass('is-black');
//         var clickedIndex = $('.l-news__toggle--item').index($(this));
//         $('.l-news__toggle--item').eq(clickedIndex).addClass('is-black');
//     });

//     $('.js-change').click(function () {
//         var $displaySlide = $('.is-black');
//         $displaySlide.removeClass('is-black');
//         // if ($(this).hasClass('next-btn')) {
//             $displaySlide.next().addClass('is-black');
//         // } else {
//         //     $displaySlide.prev().addClass('is-black');
//         // }
//     });
// });
