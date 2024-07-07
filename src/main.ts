class Point {
    constructor(public x: number, public y: number) {}
}

class DrawingApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private points: Point[] = [];
    private asyncDrawingComplete: boolean = false;
    private currentColor: string = "#000000";
    private isEraser: boolean = false;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.initialize();
    }

    private initialize() {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        document.getElementById('clearButton')?.addEventListener('click', this.clearCanvas.bind(this));
        document.getElementById('colorPicker')?.addEventListener('input', this.changeColor.bind(this));
        document.getElementById('eraserButton')?.addEventListener('click', this.toggleEraser.bind(this));

        this.logToConsole();
    }

    private startDrawing(event: MouseEvent) {
        this.isDrawing = true;
        this.context.beginPath();
        this.context.moveTo(event.offsetX, event.offsetY);
        this.points.push(new Point(event.offsetX, event.offsetY));
    }

    private draw(event: MouseEvent) {
        if (!this.isDrawing) return;

        const point = new Point(event.offsetX, event.offsetY);
        this.points.push(point);
        this.context.lineTo(point.x, point.y);

        if (this.isEraser) {
            this.context.strokeStyle = "#FFFFFF";
            this.context.lineWidth = 10; // Eraser size
        } else {
            this.context.strokeStyle = this.currentColor;
            this.context.lineWidth = 2; // Pen size
        }

        this.context.stroke();
    }

    private stopDrawing() {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        this.context.beginPath();

        // Simulate asynchronous drawing completion
        this.simulateAsyncDrawingCompletion();
    }

    private async simulateAsyncDrawingCompletion() {
        console.log("Drawing complete, processing asynchronously...");
        this.asyncDrawingComplete = await this.recursiveProcessPoints(0);
        console.log("Asynchronous processing complete.");
    }

    private async recursiveProcessPoints(index: number): Promise<boolean> {
        if (index >= this.points.length) return true;
        return new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await this.recursiveProcessPoints(index + 1));
            }, 10);
        });
    }

    private logToConsole() {
        console.log("Drawing App Initialized");
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points = [];
        console.log("Canvas cleared");
    }

    private changeColor(event: Event) {
        const input = event.target as HTMLInputElement;
        this.currentColor = input.value;
        this.isEraser = false;
        console.log(`Color changed to ${this.currentColor}`);
    }

    private toggleEraser() {
        this.isEraser = !this.isEraser;
        console.log(`Eraser mode: ${this.isEraser}`);
    }
}

// Initialize the Drawing App
document.addEventListener("DOMContentLoaded", () => {
    new DrawingApp("canvas");
});
