<?php
add_theme_support('post-thumbnails');

if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'サイドバー',
        'id' => 'sidebar',
        'description' => 'サイドバーウィジェット',
        'before_widget' => '<div>',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="l-side-title">',
        'after_title' => '</h3>'
    ));
}

// 投稿を古い順に変更
function change_old($query)
{
    $query->set('order', 'ASC');
    $query->set('orderby', 'date');
}
add_action('pre_get_posts', 'change_old');

