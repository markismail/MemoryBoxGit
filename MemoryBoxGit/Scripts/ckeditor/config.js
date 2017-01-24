/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

//CKEDITOR.editorConfig = function( config ) {
//	// Define changes to default configuration here. For example:
//	// config.language = 'fr';
//	 //config.uiColor = '#AADC6E';
//};

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for two toolbar rows.
    //config.toolbarGroups = [
    //	{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    //	{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    //	{ name: 'links' },
    //	{ name: 'insert' },
    //	{ name: 'forms' },
    //	{ name: 'tools' },
    //	{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
    //	{ name: 'others' },
    //	'/',
    //	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    //	{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    //	{ name: 'styles' },
    //	{ name: 'colors' },
    //	//{ name: 'about' }
    //];
    config.toolbarGroups = [
		{ name: 'document', groups: ['document', 'mode', 'doctools'] },
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'forms', groups: ['forms'] },
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		{ name: 'links', groups: ['links'] },
		'/',
		{ name: 'styles', groups: ['styles'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'insert', groups: ['insert'] },
		{ name: 'others', groups: ['others'] },
		{ name: 'about', groups: ['about'] }
    ];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    //config.removeButtons = 'Underline,Subscript,Superscript';
    config.removeButtons = 'Templates,Source,NewPage,Preview,Print,Save,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Superscript,Subscript,Strike,CreateDiv,ShowBlocks,About,Link,Unlink,Anchor,Flash,Table,SpecialChar,PageBreak,Iframe,SelectAll,Find,Replace,Undo,Redo,PasteFromWord,CopyFormatting,Language,BidiLtr,BidiRtl,Blockquote';
    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';
    //config.htmlEncodeOutput = true;
};