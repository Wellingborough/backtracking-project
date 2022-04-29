
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
                fill(235, 236, 208)
                stroke(235, 236, 208)
                rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            }
            else
            {
                fill(119, 149, 86)
                stroke(119, 149, 86)
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
        {index: 1, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 1, y: 0, active: false},
        {index: 2, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 2, y: 0, active: false},
        {index: 3, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 3, y: 0, active: false},
        {index: 4, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 4, y: 0, active: false},
        {index: 5, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 5, y: 0, active: false},
        {index: 6, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 6, y: 0, active: false},
        {index: 7, black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 7, y: 0, active: false}
    ]

    const d = new Date();
    previousTime = d.getTime();

    moves.push({index: 0, dx: 0, dy: 0, toggle: true})
    moves.push({index: 0, dx: 5, dy: 3, toggle: false})
    moves.push({index: 0, dx: 0, dy: 0, toggle: true})

    dt = 0
}

function playLoop()
{
    loop()
    movePieceInterval = setInterval(movePiece, 1000)
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
    console.log(number)
}


function movePiece()
{
    if (moves.length > 0)
    {
        var move = moves[0]

        if (move.toggle)
        {
            if (queens[move.index].active)
            {
                queens[move.index].active = false;
            }
            else
            {
                queens[move.index].active = true;
            }
        }

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
