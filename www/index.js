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
var viewer;
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
                viewerType: 'Viewer3D', // Viewer3D vs GuiViewer3D
                navigationTool: 'default',
            };

            viewer = viewerFactory.createViewer(
                $('#viewerDiv')[0],
                viewerConfig);

            viewer.navigation.setRequestFitToView(false);
            setUp();
            viewer.load(pathInfoCollection.path3d[0].path, null, modelHasLoaded);
            viewer.navigation.setRequestFitToView(false);
            setUp();

            
        },
        onError);

});

function setUp() {
    viewer.navigation.setRequestFitToView(false);
    viewer.navigation.setWorldUpVector(new THREE.Vector3(0,0,1), true)
}

function modelHasLoaded() {
    console.log('Shit loaded yo!');

    setUp();
    viewer.navigation.setPosition(new THREE.Vector3(5, 0, 5))
}

function onError(error) {
    console.log('Error: ' + error);
};

$(window).keydown(function(evt) {
    switch(evt.which) {
        case 37: // left
        break;

        case 38: // up
            moveForwards();
        break;

        case 39: // right
            rotateRight();
        break;

        case 40: // down

        break;

        default: return; // exit this handler for other keys
    }

    evt.stopPropagation();
    return false;
});

function moveForwards() {

}

var currentDirection = 0;
function rotateRight() {
    console.log("Rotating right");
    currentPosition = viewer.navigation.getPosition()

    switch(currentDirection) {
        case 0: 
            currentPosition.x += 1;
            currentDirection = 1;
            break;
        case 1:
            currentPosition.y += 1;
            currentDirection = 2;
            break;
        case 2:
            currentPosition.x += -1;
            currentDirection = 3;
            break;
        case 3:
            currentPosition.y += -1;
            currentDirection = 0;
            break;
    }
    currentPosition.z = 0;

    viewer.navigation.setTarget(currentPosition)

    console.log('Setting target to', currentPosition);
    console.log('Current position', viewer.navigation.getPosition());
}

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
