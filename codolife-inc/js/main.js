// PCの場合True
function isPc() {
    return window.innerWidth > 768;
}

// 水平スクロール初期化
function initHorizontalScroll(scrollWrapper, scrollElement) {
    const horizontalScrollTween = gsap.to(scrollElement, {
        x: -(scrollElement.clientWidth - scrollWrapper.clientWidth),
        ease: "none",
        scrollTrigger: {
            trigger: scrollWrapper,
            start: "top top",
            end: `+=${scrollElement.clientWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
        },
    });

    const images = document.querySelectorAll(
        ".js-works-horizontal-scroll-image"
    );
    images.forEach((image, index) => {
        gsap.to(image, {
            x: -80,
            ease: "power1.out",
            scrollTrigger: {
                trigger: image,
                start: `top-=100 top+=${180 * (index + 1)}`,
                end: `bottom-=300 top+=${180 * (index + 1)}`,
                horizontal: true,
                // markers: true,
                scrub: 2,
                containerAnimation: horizontalScrollTween,
            },
        });
    });
}

//-------------------------------------------
// DOMロードイベント
//-------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    if (isPc()) {
        // Worksセクション水平スクロール初期化
        const scrollWrapper = document.querySelector(
            ".js-works-horizontal-scroll-wrapper"
        );
        const scrollElement = document.querySelector(
            ".js-works-horizontal-scroll"
        );
        if (scrollWrapper && scrollElement) {
            initHorizontalScroll(scrollWrapper, scrollElement);
        }
    }

    // 色反転エリアに入ったら指定要素の色を反転する
    if (document.querySelector(".js-color-invert-area")) {
        gsap.set(".js-color-invert", { transition: "filter 0.8s" });
        document.querySelectorAll(".js-color-invert-area").forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top center",
                end: "bottom center",
                markers: false,
                toggleClass: {
                    targets: ".js-color-invert",
                    className: "u-color-invert",
                },
            });
        });
    }

    // Aboutカウンターアニメーション
    if (document.querySelector(".js-about-counter-anime")) {
        document.querySelectorAll(".js-about-counter-anime").forEach((el) => {
            const st = ScrollTrigger.create({
                trigger: el,
                start: "top+=50 bottom",
            });
            const end = el.dataset.end;
            const valueSnap = el.dataset.snap;
            gsap.to(el, {
                duration: 3,
                innerText: end,
                snap: { innerText: valueSnap },
                ease: "power1.in",
                delay: 0.2,
                scrollTrigger: st,
            });
        });
    }

    // フッターに入ったら背景色を変更し、背景画像を表示する
    if (document.querySelector(".js-footer")) {
        const toggleClass = () => {
            document.querySelector(".js-body").classList.toggle("u-bg-gray");
            document
                .querySelector(".js-footer-bg-image")
                .classList.toggle("u-visible");
        };
        gsap.set(".js-body", {
            transition: "background-color 0.8s ease-in-out",
        });
        gsap.set(".js-footer-bg-image", {
            autoAlpha: 0,
            transition: "opacity 2.4s ease-in-out",
        });
        ScrollTrigger.create({
            trigger: ".js-footer",
            start: "center bottom",
            end: "center bottom",
            markers: false,
            onEnter: toggleClass,
            onEnterBack: toggleClass,
        });
    }
});

class MobileMenu {
    constructor() {
        this.DOM = {};
        this.DOM.$btn = document.querySelector(".js-humburger-btn");
        this.DOM.$mobileMenu = document.querySelector(".js-nav-mobile");
        this.DOM.$inversion = document.querySelectorAll(".js-color-invert");
        this.DOM.$menuOpen = document.querySelectorAll(".js-menu-open");
        this.eventType = this._getEventType();
        this._addEvent();
    }

    _getEventType() {
        const $isTouchCapable =
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch);

        return $isTouchCapable ? "touchstart" : "click";
    }

    _toggle() {
        this.DOM.$mobileMenu.classList.toggle("is-show");
        this.DOM.$inversion.forEach(($item) =>
            $item.classList.toggle("is-inv")
        );
        this.DOM.$menuOpen.forEach(($item) =>
            $item.classList.toggle("is-open")
        );
    }

    _addEvent() {
        this.DOM.$btn.addEventListener(this.eventType, this._toggle.bind(this));
    }
}

const $spMenu = new MobileMenu();

//マウスストーカー用のdivを取得
const stalker = document.querySelector(".js-mouse-stalker");

//aタグにホバー中かどうかの判別フラグ
let hovFlag = false;

//マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
document.addEventListener("mousemove", function (e) {
    if (!hovFlag) {
        stalker.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
});

//リンクへ吸い付く処理
const linkElem = document.querySelectorAll("a:not(.no_stick_)");
for (let i = 0; i < linkElem.length; i++) {
    //マウスホバー時
    linkElem[i].addEventListener("mouseover", function (e) {
        hovFlag = true;

        //マウスストーカーにクラスをつける
        stalker.classList.add("hov_");

        //マウスストーカーの位置をリンクの中心に固定
        let rect = e.target.getBoundingClientRect();
        let posX = rect.left + rect.width / 2;
        let posY = rect.top + rect.height / 2;

        stalker.style.transform = `translate(${posX}px, ${posY}px)`;
    });
    //マウスホバー解除時
    linkElem[i].addEventListener("mouseout", function (e) {
        hovFlag = false;
        stalker.classList.remove("hov_");
    });
}

// 「databeats」1文字ずつ<span>
document.addEventListener("DOMContentLoaded", () => {
    const els = document.querySelector("#js-text-animation");
    const str = els.innerHTML.trim();
    let concatStr = "";
    for (let c of str) {
        concatStr = concatStr + `<span class="char">${c}</span>`;
    }
    els.innerHTML = concatStr;
});

// FV Timeline
window.addEventListener("DOMContentLoaded", () => {
    // 箱の蓋が開き伸縮する
    const fvCounter = document.querySelector("#js-fv-counter-anime");
    const end = fvCounter.dataset.end;
    const valueSnap = fvCounter.dataset.snap;
    const fvAnimation = gsap.timeline(); // はじめに初期化
    fvAnimation
        // FV Line出現
        .to("#home-fv-copy-sub-bg", {
            scaleX: 1,
            scaleY: 0.01,
            duration: 0.5,
            delay: 1,
        })
        .to("#home-fv-copy-sub-bg", {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            delay: 0.5,
        })
        // FV 「100%」が出現
        .to("#home-fv-copy-main01", {
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "expo.out",
        })
        // FV 「100%」カウントアップ
        .to("#js-fv-counter-anime", {
            duration: 1,
            innerText: end,
            snap: { innerText: valueSnap },
            ease: "linear",
        })
        // FV 「databeats」フェードイン
        .to(".char", {
            y: 0,
            duration: 0.1,
            stagger: 0.03,
        })
        // FV「emotions」手書き
        .add(() => {
            let stroke;
            stroke = new Vivus("js-mask-anim", {
                //アニメーションをするIDの指定
                start: "autostart", //自動再生をせずスタートをマニュアルに
                type: "scenario", // アニメーションのタイプを設定
                forceRender: false, //パスが更新された場合に再レンダリングさせない
                animTimingFunction: Vivus.EASE, //動きの加速減速設定
            });
        }, "-=0.5")
        .to(
            "#js-mask-anim",
            {
                opacity: 1,
                duration: 0.01,
            },
            "+=0.01"
        )
        .fromTo(
            "#js-text-animation2",
            {
                y: "150%",
            },
            {
                y: 0,
                delay: 2,
                duration: 0.3,
            }
        )
        .fromTo(
            ".js-dl-button",
            {
                scale: 0,
            },
            {
                scale: 1,
                duration: 0.4,
            }
        )
        .fromTo(
            ".js-header-items",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.4,
            },
            "-=0.4"
        );
});
