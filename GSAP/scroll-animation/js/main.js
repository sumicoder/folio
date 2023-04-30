// Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
    // プラグインを登録
    gsap.registerPlugin(ScrollTrigger);
    // 演出対象となる要素を取得
    gsap.to("#scroll-box01", {
        right: "100%",
        scrollTrigger: {
            trigger: "#scroll-area01", //アニメーションが始まるトリガーとなる要素
            start: "top bottom-=200", //アニメーションが始まる位置
            end: "bottom top+=200", //アニメーションが終わる位置
            scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
            markers: false,
        },
    });
    gsap.to("#scroll-box02", {
        left: "100%",
        scrollTrigger: {
            trigger: "#scroll-area02", //アニメーションが始まるトリガーとなる要素
            start: "top bottom-=200", //アニメーションが始まる位置
            end: "bottom top+=200", //アニメーションが終わる位置
            scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
            markers: false,
        },
    });
    gsap.to("#scroll-box03", {
        scale: 2,
        scrollTrigger: {
            trigger: "#scroll-area03", //アニメーションが始まるトリガーとなる要素
            start: "top bottom", //アニメーションが始まる位置
            end: "center center", //アニメーションが終わる位置
            scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
            markers: false,
        },
    });
    gsap.to("#scroll-box04", {
        scale: 1,
        scrollTrigger: {
            trigger: "#scroll-area04", //アニメーションが始まるトリガーとなる要素
            start: "top bottom", //アニメーションが始まる位置
            end: "center center", //アニメーションが終わる位置
            scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
            markers: false,
        },
    });
});

