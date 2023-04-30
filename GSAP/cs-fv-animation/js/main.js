// ローダー画面
window.addEventListener("DOMContentLoaded", () => {
    // 箱の蓋が開き伸縮する
    const fvClipAnim = gsap.timeline({ delay: 3, ease: "power4.out" }); // はじめに初期化
    fvClipAnim
        .to(".js-img-clip01", {
            clipPath: "inset(100% 0 0 0)",
            scale: 1,
            duration: 1.5,
        })
        .to(
            "#js-fv-text03",
            {
                top: "85%",
                color: "#eee",
                mixBlendMode: "color-burn",
                duration: 1.5,
            },
            "-=1.5"
        )
        .to(
            "#js-fv-text02",
            {
                top: "50%",
                color: "#999",
                mixBlendMode: "plus-lighter",
                duration: 1.5,
            },
            "-=1.5"
        )
        .to(
            "#js-fv-text01",
            {
                top: "15%",
                duration: 1.5,
            },
            "-=1.5"
        )
        .to(
            ".js-img-clip02",
            {
                scale: 1,
                duration: 1.5,
            },
            "-=1.5"
        );
});
