/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
// Base64 encoded

var defaultUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGFja21jci9tYXplLnN0bA==';

//https://developer.api.autodesk.com/oss/v1/buckets/hackmcr/objects/scad.scad

$(document).ready(function () {
    var tokenurl = 'http://' + window.location.host + '/api/token';
    var config = {
        environment : 'AutodeskProduction'
		//environment : 'AutodeskStaging'
    };

    // Instantiate viewer factory
    var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.AdnViewerFactory(
        tokenurl,
        config);

// Autodesk.Viewing.Viewer3D

    // Allows different urn to be passed as url parameter
    var paramUrn = Autodesk.Viewing.Private.getParameterByName('urn');
    var urn = (paramUrn !== '' ? paramUrn : defaultUrn);

    viewerFactory.getViewablePath (urn,
        function(pathInfoCollection) { // GuiViewer3D
            var viewerConfig = {
                viewerType: 'Viewer3D' // Viewer3D vs GuiViewer3D
            };

            var viewer = viewerFactory.createViewer(
                $('#viewerDiv')[0],
                viewerConfig);

            viewer.load(pathInfoCollection.path3d[0].path);
        },
        onError);

});

function onError(error) {
    console.log('Error: ' + error);
};

// The following code does not rely on Autodesk.ADN.Toolkit.Viewer.AdnViewerManager
// and uses the Autodesk API directly.
//
//        $(document).ready(function () {
//            var getToken =  function() {
//                var xhr = new XMLHttpRequest();
//                xhr.open("GET", 'http://' + window.location.host + '/api/token', false);
//                xhr.send(null);
//                return xhr.responseText;
//            }
//
//            function initializeViewer(containerId, documentId, role) {
//                var viewerContainer = document.getElementById(containerId);
//                var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
//                        viewerContainer);
//                viewer.start();
//
//                Autodesk.Viewing.Document.load(documentId,
//                        function (document) {
//                            var rootItem = document.getRootItem();
//                            var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
//                                    rootItem,
//                                    { 'type': 'geometry', 'role': role },
//                                    true);
//
//                            viewer.load(document.getViewablePath(geometryItems[0]));
//                        },
//
//                        // onErrorCallback
//                        function (msg) {
//                            console.log("Error loading document: " + msg);
//                        }
//                );
//            }
//
//            function initialize() {
//                var options = {
//                    env: "AutodeskProduction",
//                    getAccessToken: getToken,
//                    refreshToken: getToken
//                };
//
//                Autodesk.Viewing.Initializer(options, function () {
//                    initializeViewer('viewerDiv', urn, '3d');
//                });
//            }
//
//            initialize();
//        });
