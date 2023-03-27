<?php
/* CSSとJavaScriptの読み込み */
function my_script_init()
{
  // 自作jsファイルの読み込み
  wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0.0', true );
  // 自作cssファイルの読み込み
  wp_enqueue_style( 'style-splide', get_template_directory_uri() . '/assets/css/splide.min.css', array(), '1.0.0', false );
  wp_enqueue_style( 'style-name', get_template_directory_uri() . '/assets/css/style.css', array(), '1.0.0', false );
};
add_action('wp_enqueue_scripts', 'my_script_init');
