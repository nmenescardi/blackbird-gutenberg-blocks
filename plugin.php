<?php
/**
 * Plugin Name: Blackbird Gutenberg Blocks
 * Plugin URI: https://github.com/nmenescardi/blackbird-gutenberg-blocks
 * Description: General Gutenberg Blocks
 * Author: Nicolas Menescardi
 * Author URI: https://www.linkedin.com/in/menescardi/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */


/**
	* Blackbird Gutenberg Blocks is a Gutenberg plugin created via create-guten-block.
*/
	
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
