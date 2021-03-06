class RTRay {
    constructor(origin = createVector(0, 0, 0), direction = createVector(0, 0, 0), length = 10000) {
        this.origin = origin;
        this.direction = direction;
        this.length = length;

        //this.closestIntersectPoint
    }

    sphereIntersection(sphere) {
        let originToSphere = p5.Vector.sub(sphere.position, this.origin)
        let projectionLength = p5.Vector.dot(originToSphere, this.direction)
        let closestPointToSphere = p5.Vector.sub(originToSphere, p5.Vector.mult(this.direction, projectionLength))
        let distanceSqr = closestPointToSphere.magSq() // or p5.Vector.dot(closestPointToSphere, closestPointToSphere)
        let radiusSqr = sphere.radius * sphere.radius

        if (distanceSqr >= radiusSqr) {
            return false
        }

        // Ray intersects the sphere
        // Checking if there is a closer intersection to the camera
        let newLength = projectionLength - Math.sqrt(radiusSqr - distanceSqr)

        

        if (newLength < this.length && newLength > 0) {
            
            // We find the closest point to the camera on the sphere
            //this.closestIntersectPoint = p5.Vector.mult(this.direction, newLength)
            this.length = newLength

            return true
        }

        return false
    }
}