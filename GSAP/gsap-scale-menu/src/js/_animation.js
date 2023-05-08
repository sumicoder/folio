import { gsap } from "gsap";
export function animation() {
    window.addEventListener("DOMContentLoaded", function () {
        const btn = document.querySelector(".btn");
        const menuTL = gsap.timeline();
        let windowHeight = window.innerHeight;
        let scale = (windowHeight / btn.clientHeight) * 2.2;
        btn.addEventListener("click", () => {
            if (!btn.classList.contains("is-active")) {
                menuTL
                    .to(".btn__bg", { scale: scale, borderRadius: "50%" })
                    .to(".btn", { backgroundColor: "#fff" }, "<")
                    .to(".btn", { "--bgc": "#dc143c" }, "<")
                    .fromTo(
                        ".menu__link",
                        { y: 20, autoAlpha: 0 },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: "none",
                        }
                    )
                    .add(() => {
                        btn.classList.add("is-active");
                    });
            } else {
                btn.classList.remove("is-active");
                gsap.to(".btn__bg", {
                    scale: 0,
                    duration: 0.3,
                });
                gsap.to(".btn", { "--bgc": "#fff" });
                gsap.to(".menu__link", {
                    autoAlpha: 0,
                    duration: 0.3,
                    ease: "none",
                });
                gsap.to(".btn", { backgroundColor: "#dc143c", duration: 0.3 });
            }
        });
    });
}
