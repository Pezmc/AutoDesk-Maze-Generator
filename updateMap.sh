#!/bin/bash

FILENAME="maze_`date +%H_%M_%S`.stl"
openjscad jscad.js -o $FILENAME
cp $FILENAME ../workflow-curl-view.and.data.api
cd ../workflow-curl-view.and.data.api
./viewerAPI auth
./viewerAPI bucketCreate hackmcr
./viewerAPI upload $FILENAME
./viewerAPI register $FILENAME
./viewerAPI registerProgress $FILENAME

cd -
echo $FILENAME > ../workflow-node.js-view.and.data.api/CurrentMapFilename.json
sleep 5
cd ../workflow-curl-view.and.data.api && ./viewerAPI registerProgress $FILENAME