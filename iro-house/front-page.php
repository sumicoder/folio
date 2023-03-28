<?php get_header(); ?>
<figure class="img">
  <img width="1280" height="720" src="<?php bloginfo("template_url"); ?>/assets/img/common/image.webp" alt="">
</figure>
<!-- gsap確認用 -->
<div class="box">GSAP</div>
<!-- splide -->
<section class="splide" aria-label="Splideの基本的なHTML">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide"><img src="https://picsum.photos/200/300" alt=""></li>
      <li class="splide__slide"><img src="https://picsum.photos/200/300" alt=""></li>
      <li class="splide__slide"><img src="https://picsum.photos/200/300" alt=""></li>
    </ul>
  </div>
</section>
<?php get_footer(); ?>