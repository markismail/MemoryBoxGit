/*
 Copyright (c) 2007-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://cksource.com/ckfinder/license
 */

var config = {};

// Set your configuration options below.

// Examples:
// config.language = 'pl';
//config.skin = 'jquery-mobile';
//config.skin = 'light';
//config.skin = 'moono';
//config.themeCSS = '/themes/mark1/mark1.css';
//config.themeCSS = '/themes/vmem01/vmem01.css';
//config.swatch = 'B';

config.plugins = [
    //'plugins/Imageinfo',
    'plugins/metdata',
    'plugins/CustomDialog',   
    //'plugins/Plugin/Plugin, // load from path relative to ckfinder.js file
    //'http://example.com/ckfinder-plugins/plugin/plugin.js'
];

config.rememberLastFolder = false;
config.thumbnailDelay = 0;
CKFinder.define( config );

//CKFinder.start({
//    // Themes created with Theme Roller will work with the 'jquery-mobile' skin.
//    skin: 'jquery-mobile',
//    // jQuery mobile swatch name. In this guide swatches 'a', 'b' and 'c' were created.
//    //swatch: 'b',
//    // The path to your custom theme.
//    themeCSS: '/themes/mark1.css'
//});