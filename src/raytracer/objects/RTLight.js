class RTLight {
    constructor(parent, position = createVector(0, 0, 0), brightness = 255, color = color(255, 255, 255)) {
        this.parent = parent;
        this.position = position;
        this.brightness = brightness;
    }
}