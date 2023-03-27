import { Splide } from '@splidejs/splide';
export function slider() {
    const slide01 = new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        gap: 30
    });
    slide01.mount();
}