class Line{
    constructor(startXpos, startYpos, endXpos, endYpos){
        this.startXpos = startXpos;
        this.startYpos = startYpos;
        this.endXpos = endXpos;
        this.endYpos = endYpos;
    }

    draw(){
        
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(this.startXpos, this.startYpos); // from this point (x, y)
        ctx.lineTo(this.endXpos, this.endYpos); // to this point (x, y)
        ctx.stroke();
    }
}