class mazeSquare {
    constructor(rowIndex, colIndex, xPos, yPos, background) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.xPos = xPos;
        this.yPos = yPos;
        this.background = background;
        this.wall = true;
        this.status = "noLookieYet";
    }
    
    draw() {
        ctx.drawImage(this.background, (canvas.width / columns)* this.colIndex,
        (canvas.height / rows)* this.rowIndex,
        canvas.width / columns,
        canvas.height / rows
        );
    }
}