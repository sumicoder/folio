//トップに戻るときのアニメーション
$(function () {
    $('.js-to-top').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});

// メニュー押したらそこまでスクロール
$(function () {
    $('.l-header__list--pc a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
        var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
        var pos = $(elmHash).offset().top;	//idの上部の距離を取得
        $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
        return false;
    });
}());

// セクションまでスクロールしたらフェードイン
$(function () {

    const $jsFadeIn = document.querySelectorAll('.js-fade-in');

    // classで取得する場合（一致するすべての要素に追加）
    let elements = document.getElementsByClassName("js-fade-in");
    Array.prototype.forEach.call(elements, function (element) {
        element.classList.add("u-fade-in-nonactive");
    });

    $(window).on('scroll', function () {
        var elem = $('.js-fade-in');
        var fadeIn = 'u-fade-in-active';
        var fadeOut = 'u-fade-in-nonactive';
        elem.each(function () {
            var elemOffset = $(this).offset().top;
            var scrollPos = $(window).scrollTop();
            var wh = $(window).height();

            if (scrollPos >= elemOffset - wh + (wh / 25)) {
                $(this).addClass(fadeIn);
                $(this).removeClass(fadeOut);
            } else {
                $(this).addClass(fadeOut);
                $(this).removeClass(fadeIn);
            }
        });
    });
}());

// ハンバーガーメニュー表示
class MobileMenu {
    constructor() {
        this.DOM = {};
        this.DOM.$btn = document.querySelector(".js-menu-btn");
        this.DOM.$item01 = document.querySelector(".js-item01");
        this.DOM.$item02 = document.querySelector(".js-item02");
        this.DOM.$item03 = document.querySelector(".js-item03");
        this.DOM.$spMenuItems = document.querySelectorAll('.js-sp-menu-item');
        this.DOM.$spMenuBar = document.querySelectorAll('.l-header__btn-bar');
        this.eventType = this._getEventType();
        this._addEvent();
    }

    _getEventType() {
        const $isTouchCapable = "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch);

        return $isTouchCapable ? "touchstart" : "click";
    }

    _toggle() {
        this.DOM.$spMenuItems.forEach($item => $item.classList.toggle("is-show"));
        this.DOM.$spMenuBar.forEach($item => $item.classList.toggle("is-show"));
    }

    _addEvent() {
        this.DOM.$btn.addEventListener(this.eventType, this._toggle.bind(this));
        this.DOM.$item01.addEventListener(this.eventType, this._toggle.bind(this));
        this.DOM.$item02.addEventListener(this.eventType, this._toggle.bind(this));
        this.DOM.$item03.addEventListener(this.eventType, this._toggle.bind(this));
    }
}

const $spMenu = new MobileMenu;