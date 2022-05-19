
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 600;

const CHESS_WIDTH = 400;
const CHESS_HEIGHT = 400;

const n = 8;

const squareWidth = CHESS_WIDTH / n;
const squareHeight = CHESS_HEIGHT / n;

function drawBoard()
{

    var offset = 0
    for (var i = 0; i < n; i++)
    {
        for (var j = 0; j < n; j++)
        {
            if (((i * n) + j + offset) % 2 == 0)
            {
                fill(255, 204, 153)
                stroke(255, 204, 153)
                rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            }
            else
            {
                fill(54, 34, 4)
                stroke(54, 34, 4)
                rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            }
        }
        if (n % 2 == 0)
        {
            if (offset == 1)
            {
                offset = 0;
            }
            else if (offset == 0)
            {
                offset = 1;
            }
        }
    }
}

var queens;

var previousTime;
var dt;
var movePieceInterval;

var moves = []


var canvas;
var play;
var pause;

function setup()
{
    canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.center();
    const canvasPosition = canvas.position()
    canvas.position(canvasPosition.x, canvasPosition.y - 250, "fixed")

    play = createButton("Play");
    play.mousePressed(playLoop);
    play.center("horizontal");
    play.position(play.position().x - 50, play.position().y, "fixed");
    play.addClass("button");

    pause = createButton("Pause");
    pause.mousePressed(pauseLoop);
    pause.center("horizontal");
    pause.position(pause.position().x + 50, pause.position().y, "fixed");
    pause.addClass("button");

    movePieceInterval = setInterval(movePiece, 1000);

    queens = [
        {index: 0, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 0, active: false},
        {index: 1, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 1, active: false},
        {index: 2, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 2, active: false},
        {index: 3, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 3, active: false},
        {index: 4, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 4, active: false},
        {index: 5, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 5, active: false},
        {index: 6, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 6, active: false},
        {index: 7, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 7, active: false}
    ]

    const d = new Date();
    previousTime = d.getTime();

    dt = 0

    calculateMoves()
}

function playLoop()
{
    loop()
    movePieceInterval = setInterval(movePiece, 10)
}

function pauseLoop()
{
    noLoop()
    clearInterval(movePieceInterval);
}

function draw()
{
    clear()
    const d = new Date();
    const currentTime = d.getTime();

    dt = currentTime - previousTime;
    previousTime = currentTime;

    drawBoard()
    var number = 0;
    for (queen of queens)
    {
        number++;
        if (queen.active)
        {
            queen_image = null;

            if (queen.y % 2 == 1)
            {
                if (queen.x % 2 == 1)
                {
                    queen_image = queen.black;
                }
                else
                {
                    queen_image = queen.white;
                }
            }
            else if (queen.y % 2 == 0)
            {
                if (queen.x % 2 == 1)
                {
                    queen_image = queen.white;
                }
                else
                {
                    queen_image = queen.black;
                }
            }
            else
            {
                console.log("something has gone terribly wrong")
            }
            image(queen_image, queen.x * squareWidth, queen.y * squareHeight, squareWidth, squareHeight);
        }
        else
        {
            image(queen.black, ((n - queen.index) * squareWidth - squareWidth), squareHeight * 9, squareWidth, squareHeight);
        } 
    }
}

function movePiece()
{
    if (moves.length > 0)
    {
        var move = moves[0]

        queens[move.index].active = move.active        

        if (move.dx != 0)
        {
            const dx = move.dx;
            queens[move.index].x += Math.round(dx / Math.abs(dx))
            move.dx -= Math.round(dx / Math.abs(dx))
        }
        else if (move.dy != 0)
        {
            const dy = move.dy;
            queens[move.index].y += Math.round(dy / Math.abs(dy))
            move.dy -= Math.round(dy / Math.abs(dy))
        }
        else
        {
            moves.shift()
        }
    }
}

var virtualPositions = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}]

function createMove(index, x, state)
{
    var dx = x - virtualPositions[index].x
    virtualPositions[index].x += dx

    if (dx != 0)
    {
        moves.push({index: index, dx: dx, dy: 0, active: state})
    }
}

function calculateMoves()
{
    var boardHistory = run()

    for (tmpBoard of boardHistory)
    {
        var paddingNumber = 8 - tmpBoard.length
        for (var i = 0; i < paddingNumber; i++)
        {
            tmpBoard.push(-1)
        }
    }
    
    moves.push({index: 0, dx: 0, dy: 0, active: true})

    for (tmpBoard of boardHistory)
    {
        //console.log(tmpBoard)
        //for (var i = 0; i < tmpBoard.length; i++)
        for (var i = tmpBoard.length-1; i >= 0; i--)
        {   
            const item = tmpBoard[i]

            if (item == -1)
            {
                createMove(i, 0, false)
            }
            else
            {
                createMove(i, item - 1, true)
            }
        }
    }
}
