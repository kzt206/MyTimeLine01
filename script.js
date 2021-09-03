//Canvasの設定
const canvasSheet = document.querySelector("#canvasSheet");
const ctxSheet = canvasSheet.getContext("2d");
const canvasPaint = document.querySelector("#canvasPaint");
const ctxPaint = canvasPaint.getContext("2d");

canvasSheet.width = 3146;
canvasSheet.height = 2263;
canvasPaint.width = canvasSheet.width;
canvasPaint.height = canvasSheet.height;

