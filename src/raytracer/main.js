let WIDTH = 512;
let HEIGHT = 512;

let pixDensity;

let rtCamera;

let scene

let objects

let light
let sphere1
let sphere2

let red;
let green;
let blue;
let gray;

let fpsCounter

function setup() {
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);
    background(0);
    pixDensity = pixelDensity();

    scene = new RTObject()

    objects = []

    createCamera()
    createScene()

    red = createVector(1, 0, 0);
    green = createVector(0, 1, 0);
    blue = createVector(0, 0, 1);
    gray = createVector(1, 1, 1)

    background(0)

    print("Render - Started")

    let screenCenter = p5.Vector.add(rtCamera.position, p5.Vector.mult(rtCamera.rotation, rtCamera.screenDistance))
    let leftTop = p5.Vector.add(screenCenter, createVector(-1, 1, 0))
    let rightTop = p5.Vector.add(screenCenter, createVector(1, 1, 0))
    let leftBot = p5.Vector.add(screenCenter, createVector(-1, -1, 0))
    let rightBot = p5.Vector.add(screenCenter, createVector(1, -1, 0))

    loadPixels();

    for (let y = 0; y < HEIGHT; y = y + 1) {
        for (let x = 0; x < WIDTH; x = x + 1) {
            let u = x / WIDTH
            let v = y / HEIGHT

            let pointOnScreen = p5.Vector.add(leftBot, p5.Vector.add(p5.Vector.mult(p5.Vector.sub(rightBot, leftBot), u), p5.Vector.mult(p5.Vector.sub(leftTop, leftBot), v)))
            let rayDirection = p5.Vector.sub(pointOnScreen, rtCamera.position)
            rayDirection.normalize()
            let ray = new RTRay(rtCamera.position, rayDirection, 15)

            let color = createVector(0, 0, 0)

            for (i = 0; i < objects.length; i++)
            {
                let object = objects[i]

                if (object.type == RTSphere.type)
                {
                    if (ray.sphereIntersection(object) == true) {

                        let closestIntersectPoint = p5.Vector.mult(ray.direction, ray.length)

                        let lightRayDirection = p5.Vector.sub(closestIntersectPoint, light.position)
                        lightRayDirection.normalize()
                        let distanceToIntersectPoint = p5.Vector.dist(light.position, closestIntersectPoint)
                        let lightRay = new RTRay(light.position, lightRayDirection)

                        if (lightRay.sphereIntersection(object) == true)
                        {
                            if (lightRay.length >= distanceToIntersectPoint - 0.00001 )
                            {
                                let intensity = light.brightness * 1 / ((lightRay.length * lightRay.length) + 1)
                                color.add(p5.Vector.mult(gray, intensity))
                            }
                        }
                    }
                }
            }

            updatePixelAt(x, y, color.x, color.y, color.z)
        }
    }

    updatePixels();

    print("Render - Done")

    //fpsCounter = new FPSCounter(10, 25, 20, 15)
}

function createCamera() {
    print("Camera - Init")

    let cameraPosition = createVector(0, 0, 0)
    let cameraRotation = createVector(0, 0, 1)
    let screenDistance = 2

    rtCamera = new RTCamera(scene, cameraPosition, cameraRotation, screenDistance)

    print("Camera - Created")
}

function createScene() {
    print("Scene - Init")

    light = new RTLight(null, createVector(5, 0, 0), createVector(0, 0, 1), 10000)
    objects.push(new RTSphere(null, createVector(0, 0, 10), createVector(0, 0, 1), 3))

    print("Scene - Created")
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
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};