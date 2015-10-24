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

var startingMazeCoord = {'x': 1, 'y': 0};
var currentMazeCoord = startingMazeCoord;

var maze = [[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
            [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
            [1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
            [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]];

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


var defaultUrn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGFja21jci9uZXdfbWF6ZV9kZXNpZ25fMjBfMjUuc3Rs';
    //'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGFja21jci9tYXplLnN0bA==';
//https://developer.api.autodesk.com/oss/v1/buckets/hackmcr/objects/scad.scad
var viewer;

var currentDirection = 2; 
$(document).ready(function() {
    var tokenurl = 'http://' + window.location.host + '/api/token';
    var config = {
        environment: 'AutodeskProduction'
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
        viewer = viewerFactory.createViewer($('#viewerDiv')[0], viewerConfig);
        events.forEach(function(evt) {
                viewer.addEventListener(evt.id, function(
                    stuff) {
                    console.log(evt.name, stuff);
                });
            })
        viewer.load(pathInfoCollection.path3d[0].path, null, resetView);
        viewer.setLightPreset(7);
        viewer.removeEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT);
        viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT);
        
        console.log(viewer.navigation.getRequestHomeView());
    }, onError);
    
    $(window).keydown(function(evt) {
        enablekeys = false;
        // If it's still running a transition, then the user can get stuffed.
        if(viewer.navigation.getTransitionActive()) return false;

        switch (evt.which) {
            case 37: // left
                rotate('left');
                break;
            case 38: // up
                move('forwards');
                break;
            case 39: // right
                rotate('right');
                break;
            case 40: // down
                move('backwards');
                break;
            case 32:
                resetView();
                break;
            default:
                return; // exit this handler for other keys
        }
        evt.stopPropagation();
        timeout(100, function() {
            enableKeys = true;
        }
        return false;
    });

});

var playerHeight = 0.2 / 6;

function onError(error) {
    console.log('Error: ' + error);
};

function resetView() {
    viewer.setLightPreset(7);
    viewer.setFocalLength(1);
    viewer.navigation.setWorldUpVector(new THREE.Vector3(0, 0, 1), true);
    currentDirection = 2; // default dir
    updateCameraPosition(new THREE.Vector3(-0.9, -1, playerHeight / 6));
    currentMazeCoord = {'x': 0, 'y': 1};
    //viewer.setBackgroundColor(255, 0, 0, 255, 0, 0);
}


function move(direction) {
    
    if(direction == 'backwards') {
        multiplier = -1;
    } else {
        multiplier = 1   
    }
    
    position = viewer.navigation.getPosition();

    console.log('Current Maze Position: ', currentMazeCoord);
    
    previousMazeCoord = {x: currentMazeCoord.x, y: currentMazeCoord.y};
    
    switch (currentDirection) {
        case 0:
            position.y -= 0.1 * multiplier;
            currentMazeCoord.x -= (1 * multiplier);
            break;
        case 1:
            position.x += 0.1 * multiplier;
            currentMazeCoord.y += (1 * multiplier);
            break;
        case 2:
            position.y += 0.1 * multiplier;
            currentMazeCoord.x += (1 * multiplier);
            break;
        case 3:
            position.x -= 0.1 * multiplier;
            currentMazeCoord.y -= (1 * multiplier);
            break;
    }
    
    if(maze[currentMazeCoord.x][currentMazeCoord.y]) {
        console.log('You hit a wall!');
        console.log('New Maze Position: ', currentMazeCoord);
        currentMazeCoord = previousMazeCoord;
        console.log('Restored Maze Position: ', currentMazeCoord);
        return false;
    }
    
    console.log('New Maze Position: ', currentMazeCoord);
    updateCameraPosition(position);
}

function rotate(direction) {
    switch(direction) {
        case 'left':
            newDirection = currentDirection + 1;
            break;
        case 'right':
            newDirection = currentDirection - 1;
            break;
    }

    if(newDirection == 4) newDirection = 0;
    if(newDirection == -1)  newDirection = 3;

    console.log("Rotating to", direction, "now at", newDirection);

    currentDirection = newDirection;
    updateCameraPosition();
}

function updateCameraPosition(newCameraPosition) {
    if(!newCameraPosition) {
        // Use current position for rotation
        newCameraPosition = viewer.navigation.getPosition();
    }
    
    targetPosition = newCameraPosition.clone();
    
    switch (currentDirection) {
        case 0:
            targetPosition.y += -20;
            break;
        case 1:
            targetPosition.x += 20;
            break;
        case 2:
            targetPosition.y += 20;
            break;
        case 3:
            targetPosition.x += -20;
            break;
    }
    targetPosition.z = 0;
    
    viewer.navigation.setRequestTransitionWithUp(true, newCameraPosition, targetPosition, viewer.getFOV(), new THREE.Vector3(0, 0, 1));
}

function updateCameraPositionFloor(newPosition) {
    if(newPosition) {
        position = newPosition;
        viewer.navigation.setPosition(newPosition);
        viewer.navigation.setPivotPoint(newPosition);
    } else {
        position = viewer.navigation.getPosition();
    }

    switch (newDirection) {
        case 0:
            position.x += 20;
            break;
        case 1:
            position.y += 20;
            break;
        case 2:
            position.x += -20;
            break;
        case 3:
            position.y += -20;
            break;
    }
    position.z = -10;

    viewer.navigation.setTarget(position)
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