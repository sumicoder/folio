import { gsap } from "gsap";
export function animation() {
    window.addEventListener("DOMContentLoaded", function () {
        const btn = document.querySelector(".btn");
        const menuTL = gsap.timeline();
        btn.addEventListener("click", () => {
            if (!btn.classList.contains("is-active")) {
                menuTL
                    .to(".container__right", {
                        clipPath: "inset(0 0 0% 0)",
                        duration: 1,
                    })
                    .to(
                        ".container__left",
                        {
                            clipPath: "inset(0% 0 0 0)",
                            duration: 1,
                        },
                        "<"
                    )
                    .to(
                        ".left__img",
                        {
                            clipPath: "inset(0% 0 0 0)",
                            duration: 1,
                        },
                        "-=0.5"
                    )
                    .to([".menu__link", ".menu__header-en"], {
                        y: 0,
                        duration: 0.3,
                        ease: "none",
                    })
                    .to(".menu__header", {
                        "--scaleX": 1,
                        duration: 0.5,
                        delay: 0.2,
                    })
                    .add(() => {
                        btn.classList.add("is-active");
                    });
            } else {
                menuTL
                    .add(() => {
                        btn.classList.remove("is-active");
                    })
                    .set(".menu__header", {
                        "--scaleX": 0,
                    })
                    .to(
                        [".menu__link", ".menu__header-en"],
                        {
                            y: "100%",
                            duration: 0.3,
                            ease: "none",
                        },
                        "<"
                    )
                    .to(".container__right", {
                        clipPath: "inset(0 0 100% 0)",
                        duration: 1,
                    })
                    .to(
                        ".container__left",
                        {
                            clipPath: "inset(100% 0 0 0)",
                            duration: 1,
                        },
                        "<"
                    )
                    .to(".left__img", {
                        clipPath: "inset(100% 0 0 0)",
                    });
            }
        });
    });
}
