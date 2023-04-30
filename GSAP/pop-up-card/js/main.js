// ローダー画面
window.addEventListener("DOMContentLoaded", () => {
    // 箱の蓋が開き伸縮する
    const boxItemTL = gsap.timeline(); // はじめに初期化
    boxItemTL
        .to("#js-cube-top", {
            rotateX: "90deg",
            duration: 1,
        })
        .to("#js-cube-top", {
            rotateX: "200deg",
            duration: 0.3,
        })
        .to("#js-box", {
            scaleX: 1.15,
            scaleY: 0.85,
            duration: 0.5,
        })
        .add(() => {
            boxItem01TL.play(); //1枚目のカード
            boxItem02TL.play(); //2枚目のカード
            boxItem03TL.play(); //3枚目のカード
            boxItem04TL.play(); //4枚目のカード
        })
        .to("#js-box", {
            scaleX: 0.85,
            scaleY: 1.15,
            duration: 0.3,
        })
        .to("#js-box", {
            scaleX: 1.05,
            scaleY: 0.9,
            duration: 0.2,
        })
        .to("#js-box", {
            scaleX: 1,
            scaleY: 1,
            duration: 0.2,
        });
    // 1枚目のカード
    const boxItem01TL = gsap.timeline({}); // はじめに初期化
    boxItem01TL
        .to("#js-cube-item01", {
            translateY: "-300%",
            translateZ: "170px",
            scale: "0.9",
            duration: 0.6,
        })
        .to("#js-cube-item01", {
            translateY: 0,
            left: 0,
            scale: "1",
            height: "450px",
            duration: 0.6,
        })
        .to(
            "#js-cube-item01",
            {
                scaleX: 1.15,
                scaleY: 0.85,
                duration: 0.5,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item01",
            {
                scaleX: 0.8,
                scaleY: 1.2,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item01",
            {
                scaleX: 1.1,
                scaleY: 0.9,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item01",
            {
                scaleX: 1,
                scaleY: 1,
                duration: 0.2,
            },
            "-=0.2"
        );
    boxItem01TL.pause();
    // 2枚目のカード
    const boxItem02TL = gsap.timeline({ delay: 0.1}); // はじめに初期化
    boxItem02TL
        .to("#js-cube-item02", {
            translateY: "-300%",
            translateZ: "170px",
            scale: "0.9",
            duration: 0.6,
        })
        .to("#js-cube-item02", {
            translateY: 0,
            translateX: "50%",
            right: 0,
            scale: "1",
            height: "450px",
            duration: 0.6,
        })
        .to(
            "#js-cube-item02",
            {
                scaleX: 1.15,
                scaleY: 0.85,
                duration: 0.5,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item02",
            {
                scaleX: 0.8,
                scaleY: 1.2,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item02",
            {
                scaleX: 1.1,
                scaleY: 0.9,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item02",
            {
                scaleX: 1,
                scaleY: 1,
                duration: 0.2,
            },
            "-=0.2"
        );
    boxItem02TL.pause();
    // 3枚目のカード
    const boxItem03TL = gsap.timeline({ delay: 0.2 }); // はじめに初期化
    boxItem03TL
        .to("#js-cube-item03", {
            translateY: "-300%",
            translateZ: "170px",
            scale: "0.9",
            duration: 0.6,
        })
        .to("#js-cube-item03", {
            translateY: 0,
            left: "-100%",
            scale: "1",
            height: "450px",
            duration: 0.6,
        })
        .to(
            "#js-cube-item03",
            {
                scaleX: 1.15,
                scaleY: 0.85,
                duration: 0.5,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item03",
            {
                scaleX: 0.8,
                scaleY: 1.2,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item03",
            {
                scaleX: 1.1,
                scaleY: 0.9,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item03",
            {
                scaleX: 1,
                scaleY: 1,
                duration: 0.2,
            },
            "-=0.2"
        );
    boxItem03TL.pause();
    // 4枚目のカード
    const boxItem04TL = gsap.timeline({ delay: 0.3 }); // はじめに初期化
    boxItem04TL
        .to("#js-cube-item04", {
            translateY: "-300%",
            translateZ: "170px",
            scale: "0.9",
            duration: 0.6,
        })
        .to("#js-cube-item04", {
            translateY: 0,
            translateX: "150%",
            right: 0,
            scale: "1",
            height: "450px",
            duration: 0.6,
        })
        .to(
            "#js-cube-item04",
            {
                scaleX: 1.15,
                scaleY: 0.85,
                duration: 0.5,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item04",
            {
                scaleX: 0.8,
                scaleY: 1.2,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item04",
            {
                scaleX: 1.1,
                scaleY: 0.9,
                duration: 0.3,
            },
            "-=0.2"
        )
        .to(
            "#js-cube-item04",
            {
                scaleX: 1,
                scaleY: 1,
                duration: 0.2,
            },
            "-=0.2"
        );
    boxItem04TL.pause();
});
