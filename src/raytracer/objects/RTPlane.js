class RTPlane {
    constructor(origin = createVector(0, 0, 0), orientation = createVector(0, 0, 0)) {
        this.origin = origin;
        this.orientation = orientation;
    }
}

RTPlane.type = "RTPlane"