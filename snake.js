//create a gameboard
var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
const cellWidth = 20;
const cellHeight = 20;

//initialize a snake using a square
const initSnake = {
    x: 200, //x-coord of snake
    y: 200, //y-coord of snake
    dx: cellWidth, //move snake into x direction with step = cellWidth
    dy: 0,
    cells: [],
    maxCells: 4
};

const initLemon = {
    x: 300,
    y: 300
};

var snake = null;
var lemon = null;

function initGame(){
    //deep copy
    //Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
    snake = JSON.parse(JSON.stringify(initSnake));
    lemon = JSON.parse(JSON.stringify(initLemon));
    console.log('snake: ' + JSON.stringify(snake));
    console.log('lemon: ' + JSON.stringify(lemon));
}

var count = 0;


function getRandom(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}

//game loop
function gameLoop(){
    //this method is similar to setTimeout, it will call the loop function again when the loop fnc finishes its execution.
    requestAnimationFrame(gameLoop);
    if(++count < 10){
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    //if snake hits the left wall then move left from the opposite wall
    if (snake.x < 0){
        snake.x = canvas.width - cellWidth;
    }
    //if snake hits the right wall then move right from the opposite wall
    else if (snake.x >= canvas.width){
        snake.x = 0;
    }

    //if snake hits the top wall then move up from the opposite wall
    if (snake.y < 0){
        snake.y = canvas.height - cellHeight;
    }
    //if snake hits the bottom wall then move down from the opposite wall
    else if (snake.y >= canvas.height){
        snake.y = 0
    }
    
    //unshift method will insert the new position of snake into cells as a new cell
    snake.cells.unshift({x: snake.x, y: snake.y});

    //adding a new cell in the head needs to remove a cell in tail to help snake move
    if (snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }

    //draw lemon
    context.fillStyle = 'yellow';
    context.fillRect(lemon.x, lemon.y, cellWidth-1, cellWidth-1);

    //draw snake
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index){
        context.fillRect(cell.x, cell.y, cellWidth-1, cellWidth-1);
        
        //snake ates lemon
        if (cell.x === lemon.x && cell.y === lemon.y){
            snake.maxCells++;
            lemon.x = getRandom(0, 20) * cellWidth;
            lemon.y = getRandom(0, 20) * cellWidth;
        }

        //check if tail of snake hits lemon
        for (var i = index + 1; i < snake.cells.length; i++){
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                initGame();
                break;
            }
        }
    });
}

//key event capture
document.addEventListener('keydown',function(e){
    var keyCode = e.which;//codes: 37=left, 39=right, 38=up, 40=down
    console.log('keyCode: ' + keyCode);

    //move left
    if (keyCode === 37 && snake.dx === 0){
        snake.dx = -cellWidth;
        snake.dy = 0;
    }
    //move right
    else if (keyCode === 39 && snake.dx === 0){
        snake.dx = +cellWidth;
        snake.dy = 0;
    }
    //move up
    else if (keyCode === 38 && snake.dy === 0){
        snake.dx = 0;
        snake.dy = -cellWidth;
    }
    //move down
    else if (keyCode === 40 && snake.dy === 0){
        snake.dx = 0;
        snake.dy = +cellWidth;
    }
    
});
initGame();
requestAnimationFrame(gameLoop);