import { gsap } from "gsap";
export function animation() {
    window.addEventListener("DOMContentLoaded", function () {
        const btn = document.querySelector(".btn");
        const menuTL = gsap.timeline();

        btn.addEventListener("click", () => {
            if (!btn.classList.contains("is-active")) {
                menuTL
                    .to(".screen__item", {
                        y: "100%",
                        direction: 0.3,
                        stagger: 0.05,
                    })
                    .fromTo(
                        ".menu__link",
                        { y: "100%" },
                        { y: 0, duration: 0.3, ease: "power2.in" },
                        "-=0.4"
                    )
                    .to(btn, { color: "#333", duration: 0.3 }, "<");
                btn.classList.add("is-active");
            } else {
                menuTL
                    .fromTo(
                        ".screen__item",
                        { y: "-100%" },
                        {
                            y: 0,
                            direction: 0.3,
                            stagger: 0.05,
                        }
                    )
                    .to(".menu__link", { y: "200%", duration: 0.3 }, "<")
                    .to(btn, { color: "#fff", duration: 0.3 }, "<");
                btn.classList.remove("is-active");
            }
        });
    });
}
