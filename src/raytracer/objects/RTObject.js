class RTObject {
    constructor(parent = null, position = createVector(0, 0, 0), rotation = createVector(0, 0, 0), type = "RTObject") {
        this.parent = parent;
        this.position = position;
        this.rotation = rotation;
        this.type = type
    }
}

RTObject.type = "RTObject"