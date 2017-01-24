/*
 * CKFinder - Sample Plugins
 * ==========================
 * http://cksource.com/ckfinder
 * Copyright (C) 2007-2015, CKSource - Frederico Knabben. All rights reserved.
 *
 * This file and its contents are subject to the MIT License.
 * Please read the LICENSE.md file before using, installing, copying,
 * modifying or distribute this file or part of its contents.
 */

CKFinder.define(['jquery', 'backbone'], function (jQuery, Backbone) {
    'use strict';

    /**
	 * Sample plugin which adds a "Share" button that opens a dialog window.
	 *
	 * This plugin illustrates how to:
	 *
	 *  - Create a complete, custom dialog window.
	 *  - Add a button to the toolbar when a file is selected.
	 *  - Define your own request handler.
	 */
    return {
        init: function (finder) {
            var icon = 'share-white.svg';

            // Detect if the black icon should be provided by looking for .ui-alt-icon class.
            // To provide different icons for LTR/RTL environment check finder.lang.dir.
            if (jQuery('body').hasClass('ui-alt-icon')) {
                icon = 'share-black.svg';
            }
            this.addCss('.ui-icon-share:after { background-image: url(' + '/CKFinderScripts/plugins/' + 'gfx/' + icon + '); }');

            // Add a button to the "Main" toolbar.
            // See also events: toolbar:reset:Main, toolbar:reset:Main:files, toolbar:reset:Main:folder, toolbar:reset:Main:resources.
            finder.on('toolbar:reset:Main:file', function (evt) {
                var file = evt.data.file;
                evt.data.toolbar.push({
                    name: 'Meta',
                    label: 'Add Metadata',
                    // Place "Share" after the "Download" button.
                    priority: 65,
                    icon: 'share',
                    action: function () {
                        finder.request('MetaFunc', { file: file });
                    }
                });
            });
            
            function MetaFunc(data) {
                // alert("metafunc top");
                // Data was passed in finder.request.
                var fileName = data.file.get('name');
                var newMetaD = '';
                var errormsg = '';
                var feeling = '';
                var loc = parent.location.toString();
                console.log(loc);
                var locsplit = loc.split("Home");
                console.log(locsplit);
                var MetaTemplate =
                                  '<input type="text" class="form-control" id="txtDescription" placeholder="Description">' +
                                  '<div class="btn-group" role="group" aria-label="...">' +
                                  '<img id="Happy"   src="' + locsplit[0] + 'Images/happy_smiley.png" title="happy or cheerful" type="button" style="width: 64px;cursor: pointer;">' +
                                  '<img id="Unhappy" src="' + locsplit[0] + '/Images/sad_smiley.png" title="sad or unhappy" type="button" style="width: 64px;cursor: pointer;">' +
                                  '<img id="Love"    src="' + locsplit[0] + '/Images/love_smiley.png" title="affection or love" type="button" style="width: 64px;cursor: pointer;">' +
                                  '<img id="Angry"   src="' + locsplit[0] + '/Images/angry_smiley.png" title="angry or aggressive" type="button" style="width: 64px;cursor: pointer;">' +
                                  '</div></br>' +
                                  '<div id="txtFeeling"> </div>' +
                                  '</br></hr>' +
                                  '<div style="color:red;" id="errordiv"> </div>' +
                                  '<button id="saveMeta" type="button" class="btn btn-success"><span class="glyphicon glyphicon-save-file" aria-hidden="true"></span> Save Metadata</button>' +
                                  '<button id="cancel" type="button" class="btn btn-warning">Cancel</button>';
                finder.request('dialog', {
                    name: 'MetaDialog',
                    title: 'Add Metadata for ' + fileName,
                    //template: '                    {{? it.msg }}<p>{{= it.msg }}</p>{{?}}{{~ it.words :word }}' +
                    //'<label><input type="checkbox" name="service" value="{{= word }}">{{= word }}</label>{{~}}',
                    template: MetaTemplate,
                    //templateModel: new Backbone.Model({
                    //    msg: 'File chosen:  ' + fileName ,
                    //    words: ['Facebook', 'Twitter']
                    //}),
                    buttons: []
                });
                //console.log(parent.image1);
                var currentuser = window.parent.document.getElementById('username').innerText;
                window.parent.document.getElementById('chosenFilename').innerText = fileName;

                parent.ReadMetadata();
                console.log("117 - " + feeling);
                window.parent.document.getElementById('chosenFeeling').innerText = feeling;
                console.log("119 - " + feeling);
                $("#Happy").click(function () {
                    feeling = 'Happy';
                    setFeelingWidget(feeling);
                });
                $("#Unhappy").click(function () {
                    feeling = 'Unhappy';
                    setFeelingWidget(feeling);
                });
                $("#Love").click(function () {
                    feeling = 'Love';
                    setFeelingWidget(feeling);
                });
                $("#Angry").click(function () {
                    feeling = 'Angry';
                    setFeelingWidget(feeling);
                });
                // add save function to saveMeta button
                $("#saveMeta").click(function () {
                    //feeling = window.parent.document.getElementById('chosenFeeling').innerText;
                    feeling = $("#txtFeeling").text();
                    newMetaD = $("#txtDescription").val();
                    if (newMetaD === undefined || newMetaD.length === 0 && feeling === undefined || feeling.length === 0) {
                        console.log("new Metadata or feeeling is blank " + newMetaD);
                        //alert("No Metadata entered");
                        errormsg = "No Metadata entered";
                        $('#errordiv').text(errormsg);
                        //alert('Sharing on: ' + checked.join(', '));
                    }
                    else {
                        console.log("new meta for " + fileName + " is:  " + newMetaD + " || feeling msg is: " + feeling);
                        // Destroy the dialog.
                        //finder.request('dialog:destroy');
                        parent.WriteMetadata(fileName, newMetaD, feeling);
                        finder.request('dialog:destroy');
                    }
                });
                // addd close dialog to cancel button
                $("#cancel").click(function () {
                    finder.request('dialog:destroy');
                });
            }
            function setFeelingWidget(feeling) {
                $("#Happy").removeClass("chosenfeeling");
                $("#Unhappy").removeClass("chosenfeeling");
                $("#Love").removeClass("chosenfeeling");
                $("#Angry").removeClass("chosenfeeling");
                $('#txtFeeling').text(feeling);
                if (feeling === 'Happy') {
                    $("#Happy").addClass("chosenfeeling");
                }
                else if (feeling === 'Unhappy') {
                    $("#Unhappy").addClass("chosenfeeling");
                }
                else if (feeling === 'Love') {
                    $("#Love").addClass("chosenfeeling");
                }
                else if (feeling === 'Angry') {
                    $("#Angry").addClass("chosenfeeling");
                }
            }
            finder.setHandler('MetaFunc', MetaFunc, this);
        }
    };
});
