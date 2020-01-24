class RTSphere extends RTObject {
    constructor(parent, position = createVector(0, 0, 0), rotation = createVector(0, 0, 0), radius = 0) {
        super(parent, position, rotation, RTSphere.type);
        this.radius = radius;
    }
}

RTSphere.type = "RTSphere"