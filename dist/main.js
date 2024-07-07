"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var DrawingApp = /** @class */ (function () {
    function DrawingApp(canvasId) {
        this.isDrawing = false;
        this.points = [];
        this.asyncDrawingComplete = false;
        this.currentColor = "#000000";
        this.isEraser = false;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.initialize();
    }
    DrawingApp.prototype.initialize = function () {
        var _a, _b, _c;
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        // Add event listeners for toolbar buttons
        (_a = document.getElementById('clearButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.clearCanvas.bind(this));
        (_b = document.getElementById('colorPicker')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', this.changeColor.bind(this));
        (_c = document.getElementById('eraserButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.toggleEraser.bind(this));
        this.logToConsole();
    };
    DrawingApp.prototype.startDrawing = function (event) {
        this.isDrawing = true;
        this.context.beginPath();
        this.context.moveTo(event.offsetX, event.offsetY);
        this.points.push(new Point(event.offsetX, event.offsetY));
    };
    DrawingApp.prototype.draw = function (event) {
        if (!this.isDrawing)
            return;
        var point = new Point(event.offsetX, event.offsetY);
        this.points.push(point);
        this.context.lineTo(point.x, point.y);
        if (this.isEraser) {
            this.context.strokeStyle = "#FFFFFF";
            this.context.lineWidth = 10; // Eraser size
        }
        else {
            this.context.strokeStyle = this.currentColor;
            this.context.lineWidth = 2; // Pen size
        }
        this.context.stroke();
    };
    DrawingApp.prototype.stopDrawing = function () {
        if (!this.isDrawing)
            return;
        this.isDrawing = false;
        this.context.beginPath();
        // Simulate asynchronous drawing completion
        this.simulateAsyncDrawingCompletion();
    };
    DrawingApp.prototype.simulateAsyncDrawingCompletion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Drawing complete, processing asynchronously...");
                        _a = this;
                        return [4 /*yield*/, this.recursiveProcessPoints(0)];
                    case 1:
                        _a.asyncDrawingComplete = _b.sent();
                        console.log("Asynchronous processing complete.");
                        return [2 /*return*/];
                }
            });
        });
    };
    DrawingApp.prototype.recursiveProcessPoints = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (index >= this.points.length)
                    return [2 /*return*/, true];
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = resolve;
                                        return [4 /*yield*/, this.recursiveProcessPoints(index + 1)];
                                    case 1:
                                        _a.apply(void 0, [_b.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 10);
                    })];
            });
        });
    };
    DrawingApp.prototype.logToConsole = function () {
        console.log("Drawing App Initialized");
    };
    DrawingApp.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points = [];
        console.log("Canvas cleared");
    };
    DrawingApp.prototype.changeColor = function (event) {
        var input = event.target;
        this.currentColor = input.value;
        this.isEraser = false;
        console.log("Color changed to ".concat(this.currentColor));
    };
    DrawingApp.prototype.toggleEraser = function () {
        this.isEraser = !this.isEraser;
        console.log("Eraser mode: ".concat(this.isEraser));
    };
    return DrawingApp;
}());
// Initialize the Drawing App
document.addEventListener("DOMContentLoaded", function () {
    new DrawingApp("canvas");
});
