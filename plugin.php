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
 */


/**
	* Blackbird Gutenberg Blocks is a Gutenberg plugin created via create-guten-block.
*/

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

define('INCPATH', realpath(dirname(__FILE__)) . DIRECTORY_SEPARATOR);
require_once INCPATH . 'vendor\autoload.php';

$pluginsDir = plugins_url('/', dirname(__FILE__)) . basename(__DIR__);
$bgb = new BlackbirdGutenbergBlocks\BlackbirdGutenbergBlocks($pluginsDir);
$bgb->init();
