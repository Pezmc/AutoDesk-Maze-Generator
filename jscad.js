console.log("Generating a new MAZE");
console.log("======================");

var generator = require('/Users/pezcuckow/Git/workflow-node.js-view.and.data.api/MazeGenerator.js');
var maze = generator.generateMaze();

var fs = require('fs');
fs.writeFileSync('/Users/pezcuckow/Git/workflow-node.js-view.and.data.api/CurrentMaze.js', JSON.stringify(maze));

console.log(JSON.stringify(maze));

var mh = 2; // maze height

function main() {
   var points = [];
   
   for(var y = 0; y < maze.length; y++) {
      var start_x;
      for(var x = 0; x < maze[y].length; x++) {
         if(maze[y][x] == 1) {
             start_x = x;
             end_x = x + 1;
             while(maze[y][end_x]) {
                 end_x++;
             }
             points.push(linear_extrude({height: mh},
                translate([x,y,0], square([end_x - start_x,1]))
             ));
             
             x = end_x;
         }
      }
   }
   
   return points;
}