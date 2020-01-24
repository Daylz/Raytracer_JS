class RTLight extends RTObject {
    constructor(parent, position = createVector(0, 0, 0), rotation = createVector(0, 0, 0), brightness = 255) {
        super(parent, position, rotation, RTLight.type);
        this.brightness = brightness;
    }
}

RTLight.type = "RTLight"