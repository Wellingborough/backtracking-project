
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;

const n = 8;

const squareWidth = SCREEN_WIDTH / n;
const squareHeight = SCREEN_HEIGHT / n;

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

function moveQueen(index, newx, newy, animation)
{
    if (!animation)
    {
        queens[index].x = newx;
        queens[index].y = newy;
    }
}

var queens;

var previousTime;
function setup()
{
    var canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.center();

    queens = [
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 0, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 1, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 2, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 3, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 4, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 5, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 6, y: 0},
        {black: loadImage("./resources/black_queen.png"), white: loadImage("./resources/white_queen.png"), x: 7, y: 0}
    ]

    //moveQueen(0, 0, 3, false)

    const d = new Date();
    previousTime = d.getTime();
}
function draw()
{
    const d = new Date();
    const currentTime = d.getTime();

    const dt = currentTime - previousTime;
    previousTime = currentTime;


    drawBoard()

    for (queen of queens)
    {
        queen_image = null;

        if ((queen.x % 2 == 1 || queen.y % 2 == 1))
        {
            queen_image = queen.white;
        }
        else
        {
            queen_image = queen.black;
        }
        

        image(queen_image, queen.x * squareWidth, queen.y * squareHeight, squareWidth, squareHeight);
    }
}