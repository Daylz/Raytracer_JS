let WIDTH = 512;
let HEIGHT = 512;

let pixDensity;

let rtCamera;

function setup() {
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    background(0);
    pixDensity = pixelDensity();

    createCamera()

    let screenCenter = rtCamera.position.add(rtCamera.direction.mult(rtCamera.screenDistance))
    loadPixels();

    for (let x = 0; x < WIDTH; x++)
    {
        for (let y = 0; y < HEIGHT; y++)
        {
            updatePixelAt(x, y, 255, 128, 64, 255)
        }
    }

    updatePixels();
}

function createCamera()
{
    print("Camera - init")

    cameraPosition = createVector(0, 0, 0)
    cameraDirection = createVector(0, 0, 1)
    screenDistance = 1

    rtCamera = new RTCamera(cameraPosition, cameraDirection, screenDistance)

    print("Camera - created")
}

function updatePixelAt(x, y, r = 0, g = 0, b = 0, a = 1)
{
    for (let i = 0; i < pixDensity; i++) {
        for (let j = 0; j < pixDensity; j++) {
          // loop over
          index = 4 * ((y * pixDensity + j) * WIDTH * pixDensity + (x * pixDensity + i));
          pixels[index] = r;
          pixels[index+1] = g;
          pixels[index+2] = b;
          pixels[index+3] = a;
        }
      }
}