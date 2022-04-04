let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "#795548";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let columns = 25;
let rows = 25;
let lines = [];
let sqWidth = canvas.width/columns;
let sqHeight = canvas.height/rows;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;
let gridCords = [];
let Lookiefied = [];
let weBeLookinAtDisOne = [];

let sqBackground = new Image();
sqBackground.src = "sprites/X_junction/X_junction.png";

/*
window.onload = function() {
        // vertical lines
    for (let i = 0; i < columns; i++){
      lines.push(new Line(
          (sqWidth*i),
          0,
          (sqWidth*i),
          canvas.height
      ));
        
        // Horizontal lines
        for (let j = 0; j < rows; j++){
            lines.push(new Line(
                0,
                (sqHeight * j),
                canvas.width,
                (sqHeight * j)
            ));
            gridCords.push([sqWidth*i, sqHeight * j]);
        }
    }
    console.log(lines);
    console.log(gridCords);
}

*/

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for(let row of maze)
    for(let column of row)
        column.draw();
    for(let line of lines) {
        line.draw();
 
    }
}, 1000, 100);
    
function generateMaze() {
    let mazeSquares = [];
    for (let y = 0; y < columns; y++) {
        mazeSquares[y] = [];
        
        for (let x = 0; x < rows; x++) {
            let ms = new mazeSquare(x, y, sqWidth*y, sqHeight * x, sqBackground);
            mazeSquares[y].push(ms);
            ms.draw(); 
        }
    }
    return mazeSquares
}
let maze = generateMaze();
console.log(maze);
