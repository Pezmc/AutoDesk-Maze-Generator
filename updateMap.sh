#!/bin/bash

FILENAME="maze_`date +%H_%M_%S`.stl"
openjscad jscad.js -o $FILENAME
cp $FILENAME ../workflow-curl-view.and.data.api
cd ../workflow-curl-view.and.data.api && ./viewerAPI auth
cd ../workflow-curl-view.and.data.api && ./viewerAPI bucketCreate hackmcr
cd ../workflow-curl-view.and.data.api && ./viewerAPI upload $FILENAME
cd ../workflow-curl-view.and.data.api && ./viewerAPI register $FILENAME
cd ../workflow-curl-view.and.data.api && ./viewerAPI registerProgress $FILENAME
sleep 5
cd ../workflow-curl-view.and.data.api && ./viewerAPI registerProgress $FILENAME
