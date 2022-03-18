
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;

function setup()
{
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function draw()
{

    const squareWidth = SCREEN_WIDTH / 8;
    const squareHeight = SCREEN_HEIGHT / 8;

    const n = 8

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