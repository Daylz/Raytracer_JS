let WIDTH = 512;
let HEIGHT = 512;

let pixDensity;

let rtCamera;

let scene

let sphere1
let sphere2

let fpsCounter

function setup() {
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    background(0);
    pixDensity = pixelDensity();

    print(pixDensity)

    createCamera()
    createScene()

    

    fpsCounter = new FPSCounter(10, 25, 20, 15)
}

function createScene()
{
    scene = createVector(0, 0, 0)
    sphere1 = new RTSphere(scene, createVector(-1, 0, 1.5), 1)
    sphere2 = new RTSphere(scene, createVector(1, 0, 1.5), 1)
}

function draw() {
    background(0)

    if (keyIsDown(65)) {
        rtCamera.position.add(createVector(-0.1, 0, 0));
    } else if (keyIsDown(68)) {
        rtCamera.position.add(createVector(0.1, 0, 0));
    }
    else if (keyIsDown(87)) {
        rtCamera.position.add(createVector(0, 0, 0.1));
    }
    else if (keyIsDown(83)) {
        rtCamera.position.add(createVector(0, 0, -0.1));
    }
    else if (keyIsDown(37)) {
        rtCamera.direction.add(createVector(-0.1, 0, 0));
    }
    else if (keyIsDown(38)) {
        rtCamera.direction.add(createVector(0, -0.1, 0));
    }
    else if (keyIsDown(39)) {
        rtCamera.direction.add(createVector(0.1, 0, 0));
    }
    else if (keyIsDown(40)) {
        rtCamera.direction.add(createVector(0, 0.1, 0));
    }
    else if (keyIsDown(72)) {
        rtCamera.screenDistance -= 0.1 
    }
    else if (keyIsDown(78)) {
        rtCamera.screenDistance += 0.1 
    }

    let screenCenter = p5.Vector.add(rtCamera.position, p5.Vector.mult(rtCamera.direction, rtCamera.screenDistance))
    let leftTop = p5.Vector.add(screenCenter, createVector(-1, 1, 0))
    let rightTop = p5.Vector.add(screenCenter, createVector(1, 1, 0))
    let leftBot = p5.Vector.add(screenCenter, createVector(-1, -1, 0))
    let rightBot = p5.Vector.add(screenCenter, createVector(1, -1, 0))

    loadPixels();

    for (let y = 0; y < HEIGHT; y=y+1) {
        for (let x = 0; x < WIDTH; x=x+1) {
            let u = x / WIDTH
            let v = y / HEIGHT

            let pointOnScreen = p5.Vector.add(leftBot, p5.Vector.add(p5.Vector.mult(p5.Vector.sub(rightBot, leftBot), u), p5.Vector.mult(p5.Vector.sub(leftTop, leftBot), v)))
            let rayDirection = p5.Vector.sub(pointOnScreen, rtCamera.position)
            rayDirection.normalize()
            let ray = new RTRay(rtCamera.position, rayDirection, 15)

            let color = createVector(0, 0, 0)

            if (ray.sphereIntersection(sphere1) == true) {
                //updatePixelAt(x, y, 255, 0, 0)
                color.add(createVector(255, 0, 0))
            }

            if (ray.sphereIntersection(sphere2) == true) {
                //updatePixelAt(x, y, 0, 255, 0)
                color.add(createVector(0, 255, 0))
            }

            updatePixelAt(x, y, color.x, color.y, color.z)
        }
    }

    updatePixels();

    fpsCounter.show()
}

/*function keyPressed() {

    if (keyCode === LEFT_ARROW) {
        rtCamera.position.add(createVector(-1, 0, 0));
    } else if (keyCode === RIGHT_ARROW) {
        rtCamera.position.add(createVector(1, 0, 0));
    }
    else if (keyCode === UP_ARROW) {
        rtCamera.position.add(createVector(0, 0, 1));
    }
    else if (keyCode === DOWN_ARROW) {
        rtCamera.position.add(createVector(0, 0, -1));
    }
}*/

function createCamera() {
    print("Camera - init")

    let cameraPosition = createVector(0, 0, 0)
    let cameraDirection = createVector(0, 0, 1)
    let screenDistance = 1

    rtCamera = new RTCamera(cameraPosition, cameraDirection, screenDistance)

    print("Camera - created")
}

/**
 * Updates the pixel color at a specifix coordinate [x, y]
 *
 * Example:
 * updatePixelAt(10, 13, 255, 128, 64, 255)
 *
 * @param {Number} x x coordinate of the pixel
 * @param {Number} y y coordinate of the pixel
 * @param {Number} r red value [0, 255]
 * @param {Number} g green value [0, 255]
 * @param {Number} b blue value [0, 255]
 * @param {Number} a alpha value [0, 255]
 */
function updatePixelAt(x = 0, y = 0, r = 0, g = 0, b = 0, a = 255) {
    for (let i = 0; i < pixDensity; i++) {
        for (let j = 0; j < pixDensity; j++) {
            index = 4 * ((y * pixDensity + j) * WIDTH * pixDensity + (x * pixDensity + i));
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
    }
}

function map(value, min1, max1, min2, max2)
{
    if (value == nil)
        return 0
    end

    let perc = (value - min1) / (max1 - min1)
    return perc * (max2 - min2) + min2
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };