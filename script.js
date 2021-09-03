//Canvasの設定
const canvasSheet = document.querySelector("#canvasSheet");
const ctxSheet = canvasSheet.getContext("2d");
const canvasPaint = document.querySelector("#canvasPaint");
const ctxPaint = canvasPaint.getContext("2d");

canvasSheet.width = 3146/3;
canvasSheet.height = 2263/3;
canvasPaint.width = canvasSheet.width;
canvasPaint.height = canvasSheet.height;



//マップ画像の読み込み
const selectSheetFile = document.getElementById("sheetFile");

selectSheetFile.addEventListener("change",function(evt){
    console.log("file selector");

    let file = evt.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(file[0]);

    console.log(file[0]);

    reader.onload = function(){
        let dataURL = reader.result;
        let img = new Image();

        img.src = dataURL;

        img.onload = function(){
            ctxSheet.drawImage(img,0,0,canvasSheet.width,canvasSheet.height);
        }
        ctxSheet.fillRect(50,90,30,20);
    }
},false);


//penの設定
let penStatus = "pencil";

const penBlueButton = document.getElementById("penBlueButton");
penBlueButton.addEventListener("click",()=>{
    penStatus = "pencil";
    ctxPaint.fillStyle = "blue";  //線の色を変更
    console.log("penBlue selected");
})

//消しゴムボタンの設定
const eraserButton = document.getElementById("eraserButton");
eraserButton.addEventListener("click",() => {
    console.log("Eraser is clicked");
    penStatus = "eraser";
})

//名前シールボタンの設定
const canvasNameSticker = document.getElementById("canvasNameSticker");
const ctxNameSticker = canvasNameSticker.getContext("2d");
canvasNameSticker.width = 100;
canvasNameSticker.height = 50;
const nameStickerButton = document.getElementById("nameStickerButton");
nameStickerButton.addEventListener("click",() => {
    ctxNameSticker.clearRect(0, 0, canvasNameSticker.width, canvasNameSticker.height);
    const nameSticker = document.getElementById("memoName");
    //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
	ctxNameSticker.textBaseline = 'top';
	ctxNameSticker.textAlign = 'left';
    //文字のスタイルを指定
	ctxNameSticker.font = '22px serif';
	ctxNameSticker.fillStyle = 'red';
    ctxNameSticker.fillText(memoName.value, 10, 10);

    let link = document.createElement("a");
    link.href = canvasNameSticker.toDataURL("image/png");
    link.download = "tmp/nameSticker.png";
    link.click();

    penStatus = "nameSticker";

})

//スタンプの設置
//スタンプ画像の設定
const charaNameSticker = new Image();
charaNameSticker.src = "tmp/tmp_nameSticker.png"

//canvasをクリックしたときのイベント設定
this.canvasPaint.addEventListener("mousedown",(e) => {
    let x = e.offsetX-25;
    let y = e.offsetY-25;

    console.log("x:",x,"y:",y);
    //penStatusの状態に応じて挙動変更
    console.log("Penstatus;",penStatus);
      if(penStatus == "nameSticker") {
        ctxPaint.drawImage(charaNameSticker,x,y);
      } else if(penStatus == "school"){
        ctxPaint.drawImage(charaSchool,x+25,y+25);
      } else if(penStatus == "evacuation"){
        ctxPaint.drawImage(charaEvacuation,x+25,y+25);
      } else if(penStatus == "camera1"){
        ctxPaint.drawImage(charaCamera1,x+25,y+25);
      } else if(penStatus == "camera2"){
        ctxPaint.drawImage(charaCamera2,x+25,y+25);
      } else if(penStatus == "camera3"){
        ctxPaint.drawImage(charaCamera3,x+25,y+25);
      } else if(penStatus == "camera4"){
        ctxPaint.drawImage(charaCamera4,x+25,y+25);
      } else if(penStatus == "camera5"){
        ctxPaint.drawImage(charaCamera5,x+25,y+25);
      } else if(penStatus == "eraser"){
        ctxPaint.clearRect(e.offsetX,e.offsetY,20,20);
      }
})

//clearbuttonの設定
const clearButon = document.getElementById("clearButton");
clearButton.addEventListener("click",()=>{
  console.log("Clear is clicked");
  ctxPaint.clearRect(0,0,canvasPaint.width,canvasPaint.height);
})

//線を描く
// マウスがドラッグされているか(クリックされたままか)判断するためのフラグ
let isDrag = false;
//線の色の初期設定
let penSize = 4;
ctxPaint.fillStyle = "blue";
ctxPaint.strokeStyle = ctxPaint.fillStyle;
//線を描く関数
function draw(x2,y2){
    if(isDrag && penStatus == "pencil"){
        ctxPaint.beginPath();
        ctxPaint.arc(x2,y2,penSize,0,Math.PI * 2);
        ctxPaint.closePath();
        ctxPaint.fill();
        //draw line
        drawLine(x,y,x2,y2);
    }else if(isDrag && penStatus == "eraser"){
        ctxPaint.clearRect(x,y,20,20);
    }
    
    x = x2;
    y = y2;
}
function drawLine(x1,y1,x2,y2){
    ctxPaint.beginPath();
    ctxPaint.moveTo(x1,y1);
    ctxPaint.lineTo(x2,y2);
    ctxPaint.strokeStyle = ctxPaint.fillStyle;
    ctxPaint.lineWidth = penSize * 2;
    ctxPaint.stroke();
}
canvasPaint.addEventListener("mousedown",(e)=>{
    isDrag = true;
    x = e.offsetX;
    y = e.offsetY;
    // console.log(x,y)
});
canvasPaint.addEventListener("mouseup",()=>{
    isDrag = false;
    x = undefined;
    y = undefined;
});
canvasPaint.addEventListener("mousemove",(event)=>{
    draw(event.offsetX,event.offsetY);
});


//キャンバスに入ったときにマウスカーソルの変更
let cursor = document.querySelector(".mouse");

canvasPaint.addEventListener("mouseenter",(event)=>{
    // console.log("mouse enter");
    switch(penStatus){
        case "home":
            canvasPaint.style.cursor = "url(home.cur), auto";
            break;
        case "school":
            canvasPaint.style.cursor = "url(school.cur),auto";
            break;
        case "evacuation":
            canvasPaint.style.cursor = "url(evacuation.cur),auto";
            break;
        case "camera1":
            canvasPaint.style.cursor = "url(camera1.cur),auto";
            break;
        case "camera2":
            canvasPaint.style.cursor = "url(camera2.cur),auto";
            break;
        case "camera3":
            canvasPaint.style.cursor = "url(camera3.cur),auto";
            break;
        case "camera4":
            canvasPaint.style.cursor = "url(camera4.cur),auto";
            break;
        case "camera5":
            canvasPaint.style.cursor = "url(camera5.cur),auto";
            break;
        case "eraser":
            canvasPaint.style.cursor = "url(eraser-small.cur),auto";
            break;
        default:
            canvasPaint.style.cursor = "crosshair";

    
    }
    
});