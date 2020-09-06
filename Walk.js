class Walk{
    constructor(originX, originY, length) {
        this.origin = [originX, originY];
        this.walkLength = length;
        this.steps = generateWalk(length);
        this.segments = 0;
    }

    drawOrigin(){
        // Draw circle at origin
        fill(0, 0, 10);
        circle(this.origin[0], this.origin[1], xScl / 2);
    }

    display(steps){
        noFill();
        beginShape();

        let currentPoint = this.origin;

        // For each step in this walk,
        for(let i = 0; i < min(steps, this.walkLength); i++){
            // Access current step
            const step = this.steps[i];
            // Look up correct dx, dy values for current step
            let dx = dXdY[step]['dx'];
            let dy = dXdY[step]['dy'];

            vertex(currentPoint[0], currentPoint[1]);
            // Next point: (dx * xScl, dy * yScl)
            currentPoint = [currentPoint[0] + (dx * xScl), currentPoint[1] + (dy * yScl)];
        }

        endShape();

    }

}
