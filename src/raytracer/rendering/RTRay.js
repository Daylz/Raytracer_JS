class RTRay {
    constructor(origin = createVector(0, 0, 0), direction = createVector(0, 0, 0), length = 1000) {
        this.origin = origin;
        this.direction = direction;
        this.length = length;
    }

    sphereIntersection(sphere) {
        let originToSphere = p5.Vector.sub(sphere.position, this.origin)
        let projectionLength = p5.Vector.dot(originToSphere, this.direction)
        let closestPointToSphere = p5.Vector.sub(originToSphere, p5.Vector.mult(this.direction, projectionLength))
        let distanceSqr = p5.Vector.dot(closestPointToSphere, closestPointToSphere) // or closestPointToSphere.magSq()
        let radiusSqr = sphere.radius * sphere.radius

        if (distanceSqr > radiusSqr) {
            return false
        }

        // Ray intersects the sphere
        // Checking if there is a closer intersection to the camera
        let newLength = projectionLength - Math.sqrt(radiusSqr - distanceSqr)

        if (newLength < this.length && newLength > 0) {
            //this.length = newLength
            return true
        }

        return false
    }
}