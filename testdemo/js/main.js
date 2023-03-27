// cars-detail写真のスライド
(function ($) {
    document.addEventListener("DOMContentLoaded", function () {
        const $homeCarsSplideOption = {
            type: "slide",
            gap: 30,
            perPage: 1,
            perMove: 1,
            pagination: true,
            paginationKeyboard: true,
            arrows: false,
            autoplay: false,
            updateOnMove: true,

            classes: {
                pagination: "splide__pagination c-pagination",
                page: "splide__pagination__page c-page",
            },
        };
        const $homeCarsSplide = new Splide(".js-splide", $homeCarsSplideOption);
        $homeCarsSplide.mount();
    });
})();
