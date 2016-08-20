<?php
/**
 * Genesis Sample.
 *
 * This file adds functions to the Genesis Sample Theme.
 *
 * @package Genesis Sample
 * @author  StudioPress
 * @license GPL-2.0+
 * @link    http://www.studiopress.com/
 */

//* Start the engine
include_once( get_template_directory() . '/lib/init.php' );

//* Setup Theme
include_once( get_stylesheet_directory() . '/lib/theme-defaults.php' );

//* Set Localization (do not remove)
load_child_theme_textdomain( 'genesis-sample', apply_filters( 'child_theme_textdomain', get_stylesheet_directory() . '/languages', 'genesis-sample' ) );

//* Add Image upload and Color select to WordPress Theme Customizer
require_once( get_stylesheet_directory() . '/lib/customize.php' );

//* Include Customizer CSS
include_once( get_stylesheet_directory() . '/lib/output.php' );

//* Child theme (do not remove)
define( 'CHILD_THEME_NAME', 'Genesis Sample' );
define( 'CHILD_THEME_URL', 'http://www.studiopress.com/' );
define( 'CHILD_THEME_VERSION', '2.2.3' );

//* Enqueue Scripts and Styles
add_action( 'wp_enqueue_scripts', 'genesis_sample_enqueue_scripts_styles' );
function genesis_sample_enqueue_scripts_styles() {

	$stylesheet_dir = get_stylesheet_directory_uri();

	wp_enqueue_style( 'genesis-sample-fonts', '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700', array(), CHILD_THEME_VERSION );
	wp_enqueue_style( 'dashicons' );

	wp_enqueue_script( 'genesis-sample-responsive-menu', $stylesheet_dir . '/assets/js/responsive-menu.js', array( 'jquery' ), '1.0.0', true );
	$output = array(
		'mainMenu' => __( 'Menu', 'genesis-sample' ),
		'subMenu'  => __( 'Menu', 'genesis-sample' ),
	);

	wp_localize_script( 'genesis-sample-responsive-menu', 'genesisSampleL10n', $output );

	wp_enqueue_script( 'concat-js-files', $stylesheet_dir . '/main.min.js', array( 'jquery' ), '1.0.0', true );
}

//* Add HTML5 markup structure
add_theme_support( 'html5', array( 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form' ) );

//* Add Accessibility support
add_theme_support( 'genesis-accessibility', array(
	'404-page',
	'drop-down-menu',
	'headings',
	'rems',
	'search-form',
	'skip-links'
) );

//* Add viewport meta tag for mobile browsers
add_theme_support( 'genesis-responsive-viewport' );

//* Add support for custom header
add_theme_support( 'custom-header', array(
	'width'           => 600,
	'height'          => 160,
	'header-selector' => '.site-title a',
	'header-text'     => false,
	'flex-height'     => true,
) );

//* Add support for custom background
add_theme_support( 'custom-background' );

//* Add support for after entry widget
add_theme_support( 'genesis-after-entry-widget-area' );

//* Add support for 3-column footer widgets
add_theme_support( 'genesis-footer-widgets', 3 );

//* Add Image Sizes
add_image_size( 'featured-image', 720, 400, true );

//TODO add image sizes for blog picture
//add_image_size( 'blog-image-lg', 900, 500, TRUE );
//
//add_filter('image_size_names_choose', 'my_image_sizes');
//function n8f_image_sizes($sizes) {
//	$addsizes = array(
//		"featured-image" => __( "Featured Image"),
//		"blog-image-lg" => __( "Large Blog Image")
//	);
//	$newsizes = array_merge($sizes, $addsizes);
//	return $newsizes;
//}

//* Rename primary and secondary navigation menus
add_theme_support( 'genesis-menus', array(
	'primary'   => __( 'After Header Menu', 'genesis-sample' ),
	'secondary' => __( 'Footer Menu', 'genesis-sample' )
) );

//* Reposition the secondary navigation menu
remove_action( 'genesis_after_header', 'genesis_do_subnav' );
add_action( 'genesis_footer', 'genesis_do_subnav', 5 );

//* Reduce the secondary navigation menu to one level depth
add_filter( 'wp_nav_menu_args', 'genesis_sample_secondary_menu_args' );
function genesis_sample_secondary_menu_args( $args ) {

	if ( 'secondary' != $args['theme_location'] ) {
		return $args;
	}

	$args['depth'] = 1;

	return $args;

}

//* Modify size of the Gravatar in the author box
add_filter( 'genesis_author_box_gravatar_size', 'genesis_sample_author_box_gravatar' );
function genesis_sample_author_box_gravatar( $size ) {

	return 90;

}

//* Modify size of the Gravatar in the entry comments
add_filter( 'genesis_comment_list_args', 'genesis_sample_comments_gravatar' );
function genesis_sample_comments_gravatar( $args ) {

	$args['avatar_size'] = 60;

	return $args;

}

//*Add the ng-app to the <body> element
add_filter( 'genesis_attr_body', __NAMESPACE__ . '\add_ng_app_to_body' );
function add_ng_app_to_body( $attributes ) {

	$attributes['ng-app'] = 'myApp';

	return $attributes;
}

//*Add the ng-view to the <main class="content"> element
add_filter( 'genesis_attr_content_output', 'add_ng_view_to_content', 99, 3 );
function add_ng_view_to_content( $output ) {
	$output .= ' ng-view';

	return $output;
}

//*Remove Standard Genesis Loop
remove_action('genesis_loop', 'genesis_do_loop');

//*Add a controller in the Angular view to work with
add_action('genesis_loop', __NAMESPACE__ . '\do_ng_view_content');
function do_ng_view_content() {
	$output =   '<div ng-controller="example">
			        <form>
			            <input type="text" ng-model="post.placeholder" />
			        </form>
			        <div>{{post.placeholder}}</div>
			    </div>';
	echo $output;
}
