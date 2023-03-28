import { gsap } from 'gsap'
export function animation() {
    window.addEventListener('load', function () {
        gsap.to('.box', { x: 200, duration: 2 })
        // console.log('ok');
        // for (let i = 0; i < opations.length; i++) {
        //     console.log(i);
        // }
    })
}