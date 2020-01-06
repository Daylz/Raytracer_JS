let WIDTH = 256;
let HEIGHT = 256;

let pixDensity;

let rtCamera;

let sphere1
let sphere2

let fpsCounter

function setup() {
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    background(0);
    pixDensity = pixelDensity();

    createCamera()

    sphere1 = new RTSphere(createVector(-1, 0, 1.5), 1)
    sphere2 = new RTSphere(createVector(1, 0, 1.5), 1)

    fpsCounter = new FPSCounter(10, 25, 20, 15)
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
        rtCamera.direction.add(createVector(0, 1, 0));
    }
    else if (keyIsDown(39)) {
        rtCamera.direction.add(createVector(0.1, 0, 0));
    }
    else if (keyIsDown(40)) {
        rtCamera.direction.add(createVector(0, 0, 0));
    }

    let screenCenter = p5.Vector.add(rtCamera.position, p5.Vector.mult(rtCamera.direction, rtCamera.screenDistance))
    let leftTop = p5.Vector.add(screenCenter, createVector(-1, 1, 0))
    let rightTop = p5.Vector.add(screenCenter, createVector(1, 1, 0))
    let leftBot = p5.Vector.add(screenCenter, createVector(-1, -1, 0))
    let rightBot = p5.Vector.add(screenCenter, createVector(1, -1, 0))

    loadPixels();

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let u = x / WIDTH
            let v = y / HEIGHT

            let pointOnScreen = p5.Vector.add(leftBot, p5.Vector.add(p5.Vector.mult(p5.Vector.sub(rightBot, leftBot), u), p5.Vector.mult(p5.Vector.sub(leftTop, leftBot), v)))
            let rayDirection = p5.Vector.sub(pointOnScreen, rtCamera.position)
            rayDirection.normalize()
            let ray = new RTRay(rtCamera.position, rayDirection, 10000)

            if (ray.sphereIntersection(sphere1) == true) {
                updatePixelAt(x, y, 255, 0, 0)
            }

            if (ray.sphereIntersection(sphere2) == true) {
                updatePixelAt(x, y, 0, 255, 0)
            }
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

    cameraPosition = createVector(0, 0, 0)
    cameraDirection = createVector(0, 0, 1)
    screenDistance = 1

    rtCamera = new RTCamera(cameraPosition, cameraDirection, screenDistance)

    print("Camera - created")
}

function updatePixelAt(x, y, r = 0, g = 0, b = 0, a = 255) {
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