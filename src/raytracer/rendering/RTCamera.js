class RTCamera extends RTObject {
    constructor(parent, position = createVector(0, 0, 0), rotation = createVector(0, 0, 0), screenDistance = 10) {
        super(parent, position, rotation, RTCamera.type);
        this.screenDistance = screenDistance;
    }
}

RTCamera.type = "RTCamera"