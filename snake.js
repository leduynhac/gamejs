//create a gameboard
var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
var cellWidth = 20;

//initialize a snake using a square
var snake = {
    x: 200, //x-coord of snake
    y: 200, //y-coord of snake
    dx: cellWidth, //move snake into x direction with step = cellWidth
    dy: 0,
    cells: [],
    maxCells: 4
};

var count = 0;
var lemon = {
    x: 300,
    y: 300
};

function getRandom(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}

//game loop
function gameLoop(){
    requestAnimationFrame(gameLoop);
    if(++count < 10){
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.clientHeight);
    snake.x += snake.dx;
    snake.y += snake.dy;

    //if snake hits the left wall then move left from the right wall
    if (snake.x < 0){
        snake.x = canvas.width - cellWidth;
    }
    //if snake hits the right wall then move right from the left wall
    else if (snake.x >= canvas.width){
        snake.x = 0;
    }

    if (snake.y < 0){
        snake.y = canvas.height - cellWidth;
    }else if (snake.y >= canvas.height){
        snake.y = 0
    }
    
    snake.cells.unshift({x: snake.x, y: snake.y});

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
requestAnimationFrame(gameLoop);