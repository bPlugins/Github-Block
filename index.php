<?php
/**
 * Plugin Name:  Embed Github
 * Description: Embed your GitHub repositories on WordPress.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: github
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'GHB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'GHB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

//  Embed Github
class GHBEmbedGithub{
	function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_action( 'init', [$this, 'onInit'] );
	}

	function enqueueBlockAssets(){

		wp_register_style( 'ghb-github-style', plugins_url( 'dist/style.css', __FILE__ ), [ ], GHB_PLUGIN_VERSION );

		wp_register_script('ghb-github-script', plugins_url( 'dist/script.js', __FILE__ ), [ 'react', 'react-dom' ], GHB_PLUGIN_VERSION );

	}

	function onInit() {
		wp_register_style( 'ghb-github-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'ghb-github-style' ], GHB_PLUGIN_VERSION ); // Backend Style
		 
		register_block_type( __DIR__, [
			'editor_style'		=> 'ghb-github-editor-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'ghb-github-editor-script', 'github', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		$className = $className ?? '';
		$ghbBlockClassName = 'wp-block-ghb-github' . $className . ' align' . $align;

		wp_enqueue_style( 'ghb-github-style' );
		wp_enqueue_script( 'ghb-github-script' );

		ob_start(); ?>
		<div class='<?php echo esc_attr( $ghbBlockClassName);?>' id='ghbMainArea-<?php echo esc_attr( $cId )?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new GHBEmbedGithub();