class RTCamera {
    constructor(position = createVector(0, 0, 0), direction = createVector(0, 0, 0), screenDistance = 10) {
        this.position = position;
        this.direction = direction;
        this.screenDistance = screenDistance;
    }
}