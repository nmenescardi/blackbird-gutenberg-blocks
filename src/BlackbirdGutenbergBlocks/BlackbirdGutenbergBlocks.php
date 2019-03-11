<?php

namespace BlackbirdGutenbergBlocks;

// Exit if accessed directly.

if (!defined('ABSPATH')) {
	exit;
}

class BlackbirdGutenbergBlocks
{

	private $dirPath;

	public function __construct($dirPath = '')
	{

		$this->dirPath = $dirPath;
	}

	public function init()
	{
		$this->registerHooks();
	}

	private function registerHooks()
	{

		// Hook: Frontend assets.
		add_action('enqueue_block_assets', array($this, 'blackbird_gutenberg_blocks_cgb_block_assets'));

		// Hook: Editor assets.
		add_action('enqueue_block_editor_assets', array($this, 'blackbird_gutenberg_blocks_cgb_editor_assets'));
	}



	function blackbird_gutenberg_blocks_cgb_block_assets()
	{
		// Styles.
		wp_enqueue_style(
			'blackbird_gutenberg_blocks-cgb-style-css',
			$this->dirPath . '/dist/blocks.style.build.css',
			array('wp-editor')
			// filemtime( $this->dirPath . '/dist/blocks.style.build.css' ) 
		);

		$this->enqueue_load_bootstrap();
	}


	function blackbird_gutenberg_blocks_cgb_editor_assets()
	{
		// Scripts.
		wp_enqueue_script(
			'blackbird_gutenberg_blocks-cgb-block-js',
			$this->dirPath . '/dist/blocks.build.js',
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
			// filemtime( $this->dirPath . '/dist/blocks.build.js' ), 
			true
		);

		// Styles.
		wp_enqueue_style(
			'blackbird_gutenberg_blocks-cgb-block-editor-css',
			$this->dirPath . '/dist/blocks.editor.build.css',
			array('wp-edit-blocks')
			// filemtime( $this->dirPath . 'dist/blocks.editor.build.css' ) 
		);

		$this->enqueue_load_bootstrap();
	}



	function enqueue_load_bootstrap()
	{
		// Add bootstrap CSS
		wp_register_style('bootstrap-css', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', false, null, 'all');
		wp_enqueue_style('bootstrap-css');

		// Add popper js
		wp_register_script('popper-js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', ['jquery'], null, true);
		wp_enqueue_script('popper-js');

		// Add bootstrap js
		wp_register_script('bootstrap-js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', ['jquery'], null, true);
		wp_enqueue_script('bootstrap-js');

		//Font Awesome
		//wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/5.4.0/css/font-awesome.min.css'); 
	}
}
