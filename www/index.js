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
var events = [{
    id: Autodesk.Viewing.CAMERA_CHANGE_EVENT,
    name: 'Autodesk.Viewing.CAMERA_CHANGE_EVENT'
}, {
    id: Autodesk.Viewing.HIDE_EVENT,
    name: 'Autodesk.Viewing.HIDE_EVENT'
}, {
    id: Autodesk.Viewing.ISOLATE_EVENT,
    name: 'Autodesk.Viewing.ISOLATE_EVENT'
}, {
    id: Autodesk.Viewing.HIGHLIGHT_EVENT,
    name: 'Autodesk.Viewing.HIGHLIGHT_EVENT'
}, {
    id: Autodesk.Viewing.RENDER_OPTION_CHANGED_EVENT,
    name: 'Autodesk.Viewing.RENDER_OPTION_CHANGED_EVENT'
}, {
    id: Autodesk.Viewing.RESET_EVENT,
    name: 'Autodesk.Viewing.RESET_EVENT'
}, {
    id: Autodesk.Viewing.SELECTION_CHANGED_EVENT,
    name: 'Autodesk.Viewing.SELECTION_CHANGED_EVENT'
}, {
    id: Autodesk.Viewing.SHOW_EVENT,
    name: 'Autodesk.Viewing.SHOW_EVENT'
}, {
    id: Autodesk.Viewing.TOOL_CHANGE_EVENT,
    name: 'Autodesk.Viewing.TOOL_CHANGE_EVENT'
}, {
    id: Autodesk.Viewing.CUTPLANES_CHANGE_EVENT,
    name: 'Autodesk.Viewing.CUTPLANES_CHANGE_EVENT'
}, {
    id: Autodesk.Viewing.LAYER_VISIBILITY_CHANGED_EVENT,
    name: 'Autodesk.Viewing.LAYER_VISIBILITY_CHANGED_EVENT'
}, {
    id: Autodesk.Viewing.EXPLODE_CHANGE_EVENT,
    name: 'Autodesk.Viewing.EXPLODE_CHANGE_EVENT'
}, {
    id: Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
    name: 'Autodesk.Viewing.TOOLBAR_CREATED_EVENT'
}, {
    id: Autodesk.Viewing.ESCAPE_EVENT,
    name: 'Autodesk.Viewing.ESCAPE_EVENT'
}, {
    id: Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
    name: 'Autodesk.Viewing.GEOMETRY_LOADED_EVENT'
}, {
    id: Autodesk.Viewing.PROGRESS_UPDATE_EVENT,
    name: 'Autodesk.Viewing.PROGRESS_UPDATE_EVENT'
}, {
    id: Autodesk.Viewing.NAVIGATION_MODE_CHANGED_EVENT,
    name: 'Autodesk.Viewing.NAVIGATION_MODE_CHANGED_EVENT'
}, {
    id: Autodesk.Viewing.FULLSCREEN_MODE_EVENT,
    name: 'Autodesk.Viewing.FULLSCREEN_MODE_EVENT'
}, {
    id: Autodesk.Viewing.MODEL_ROOT_LOADED_EVENT,
    name: 'Autodesk.Viewing.MODEL_ROOT_LOADED_EVENT'
}, {
    id: Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
    name: 'Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT'
}, {
    id: Autodesk.Viewing.OBJECT_TREE_UNAVAILABLE_EVENT,
    name: 'Autodesk.Viewing.OBJECT_TREE_UNAVAILABLE_EVENT'
}, {
    id: Autodesk.Viewing.VIEWER_RESIZE_EVENT,
    name: 'Autodesk.Viewing.VIEWER_RESIZE_EVENT'
}, {
    id: Autodesk.Viewing.ANIMATION_READY_EVENT,
    name: 'Autodesk.Viewing.ANIMATION_READY_EVENT'
}, {
    id: Autodesk.Viewing.VIEWER_STATE_RESTORED_EVENT,
    name: 'Autodesk.Viewing.VIEWER_STATE_RESTORED_EVENT'
}, {
    id: Autodesk.Viewing.VIEWER_UNINITIALIZED,
    name: 'Autodesk.Viewing.VIEWER_UNINITIALIZED'
}];
var defaultUrn =
    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGFja21jci9tYXplLnN0bA==';
//https://developer.api.autodesk.com/oss/v1/buckets/hackmcr/objects/scad.scad
var viewer;
$(document).ready(function() {
    var tokenurl = 'http://' + window.location.host + '/api/token';
    var config = {
        environment: 'AutodeskProduction'
            //environment : 'AutodeskStaging'
    };
    // Instantiate viewer factory
    var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.AdnViewerFactory(
        tokenurl, config);
    // Autodesk.Viewing.Viewer3D
    // Allows different urn to be passed as url parameter
    var paramUrn = Autodesk.Viewing.Private.getParameterByName('urn');
    var urn = (paramUrn !== '' ? paramUrn : defaultUrn);
    viewerFactory.getViewablePath(urn, function(pathInfoCollection) { // GuiViewer3D
        var viewerConfig = {
            viewerType: 'Viewer3D', // Viewer3D vs GuiViewer3D
            navigationTool: 'default',
        };
        viewer = viewerFactory.createViewer($('#viewerDiv')[0],
            viewerConfig);
        events.forEach(function(evt) {
                viewer.addEventListener(evt.id, function(
                    stuff) {
                    console.log(evt.name, stuff);
                });
            })
        viewer.load(pathInfoCollection.path3d[0].path, null,
            modelHasLoaded, function() {
                debugger;
            });
        viewer.removeEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT);
        viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT);
        
        console.log(viewer.navigation.getRequestHomeView());
    }, onError);
});

function modelHasLoaded() {
    console.log('Shit loaded yo!');
    console.log(viewer.navigation.getRequestHomeView());
    viewer.navigation.setWorldUpVector(new THREE.Vector3(0, 0, 1), true);
    viewer.navigation.setPosition(new THREE.Vector3(30, 0, 0));
    console.log(viewer.navigation.getRequestHomeView());
    debugger
}

function onError(error) {
    console.log('Error: ' + error);
};

function resetView() {
    viewer.navigation.setWorldUpVector(new THREE.Vector3(0, 0, 1), true);
    viewer.navigation.setPosition(new THREE.Vector3(0, 0, 5));
    viewer.setBackgroundColor(255, 0, 0, 255, 0, 0);
}

$(window).keydown(function(evt) {
    switch (evt.which) {
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
        case 32:
            resetView();
            break;
        default:
            return; // exit this handler for other keys
    }
    evt.stopPropagation();
    return false;
});

function moveForwards() {}
var currentDirection = 0;

function rotateRight() {
        console.log("Rotating right");
        currentPosition = viewer.navigation.getPosition()
        switch (currentDirection) {
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