//Canvasの設定
const canvasSheet = document.querySelector("#canvasSheet");
const ctxSheet = canvasSheet.getContext("2d");
const canvasPaint = document.querySelector("#canvasPaint");
const ctxPaint = canvasPaint.getContext("2d");

original_width = 3146;  //style="width:1048px; height:754px"
original_height = 2263;
canvasFactor = 3;

canvasSheet.width = original_width;
canvasSheet.height = original_height;
canvasSheet.style.width = original_width/canvasFactor + "px";
canvasSheet.style.height = original_height/canvasFactor + "px";
canvasPaint.width = canvasSheet.width;
canvasPaint.height = canvasSheet.height;
canvasPaint.style.width = original_width/canvasFactor + "px";
canvasPaint.style.height = original_height/canvasFactor + "px";

//結合用キャンバスの設定
const canvasContact = document.querySelector("#canvasContact");
const ctxContact = canvasContact.getContext("2d");
canvasContact.width = canvasSheet.width;
canvasContact.height = canvasSheet.height;

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
let eraserWidth = 100;
let eraserHeight = 100;
const eraserButtonS = document.getElementById("eraserButtonS");
eraserButtonS.addEventListener("click",() => {
    console.log("EraserS is clicked");
    eraserWidth=50;
    eraserHeight=50;
    penStatus = "eraser";
})
const eraserButtonM = document.getElementById("eraserButtonM");
eraserButtonM.addEventListener("click",() => {
    console.log("EraserM is clicked");
    eraserWidth=100;
    eraserHeight=100;
    penStatus = "eraser";
})
const eraserButtonL = document.getElementById("eraserButtonL");
eraserButtonL.addEventListener("click",() => {
    console.log("EraserL is clicked");
    eraserWidth=150;
    eraserHeight=150;
    penStatus = "eraser";
})


//名前シールボタンの設定
const canvasNameSticker = document.getElementById("canvasNameSticker");
const ctxNameSticker = canvasNameSticker.getContext("2d");
canvasNameSticker.width = 600;
canvasNameSticker.height = 150;
const nameStickerButton = document.getElementById("nameStickerButton");
let base64name;
let nameStickerURL;
nameStickerButton.addEventListener("click",() => {
    ctxNameSticker.clearRect(0, 0, canvasNameSticker.width, canvasNameSticker.height);
    const nameSticker = document.getElementById("memoName");
    //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
	ctxNameSticker.textBaseline = 'top';
	ctxNameSticker.textAlign = 'left';
    //文字のスタイルを指定
	ctxNameSticker.font = '50px serif';
	ctxNameSticker.fillStyle = 'red';
    ctxNameSticker.fillText(nameSticker.value, 10, 10);

    // let link = document.createElement("a");
    // nameStickerURL = canvasNameSticker.toDataURL("image/png");
    // link.download = "tmp/nameSticker.png";
    // link.click();
    
    //一時保存
    base64name = canvasNameSticker.toDataURL();
    window.localStorage.setItem("saveKey", base64name); //https://www.yoheim.net/blog.php?q=20120204
    charaNameSticker.src = base64name;
    
    penStatus = "nameSticker";

})

//二重円ボタンの設定
const doubleCircleButton = document.getElementById("doubleCircleButton");
doubleCircleButton.addEventListener("click",()=> {
    penStatus = "doubleCircle";
})

//円ボタンの設定
const singleCircleButton = document.getElementById("singleCircleButton");
singleCircleButton.addEventListener("click",()=> {
    penStatus = "singleCircle";
})

//矢印ボタンの設定
const arrowButton = document.getElementById("arrowButton");
arrowButton.addEventListener("click",()=> {
    penStatus = "arrow";
})

// //避難準備ボタンの設定
// const hinanJunbiButton = document.getElementById("hinanJunbiButton");
// hinanJunbiButton.addEventListener("click",()=> {
//     penStatus = "hinanJunbi";
// })

//作業時間ボタンの設定
const canvasSagyouTimeSticker = document.getElementById("canvasSagyouTimeSticker");
const ctxSagyouTimeSticker = canvasSagyouTimeSticker.getContext("2d");
canvasSagyouTimeSticker.width = 800;
canvasSagyouTimeSticker.height = 150;
const sagyouTimeButton = document.getElementById("sagyouTimeButton");
let sagyouTimeStickerURL;
sagyouTimeButton.addEventListener("click",()=> {
       
    const string1 = "避難準備の開始"
    const string2 = "作業にかかる時間（"
    const sagyouTimeNumber = document.getElementById("sagyouTimeNumber");
    charaSagyouTimeSticker.src = createSticker1(ctxSagyouTimeSticker,canvasSagyouTimeSticker,sagyouTimeNumber.value,string1,string2)

    penStatus = "sagyouTimeSticker";
})

//避難開始ボタンの設定
const canvasHinanKaishiSticker = document.getElementById("canvasHinanKaishiSticker");
const ctxHinanKaishiSticker = canvasHinanKaishiSticker.getContext("2d");
canvasHinanKaishiSticker.width = 600;
canvasHinanKaishiSticker.height = 150;
const hinanKaishiButton = document.getElementById("hinanKaishiButton");
let hinanKaishiStickerURL;
hinanKaishiButton.addEventListener("click",()=> {
    // console.log("hinankKaishiButton is clicked.")
    const string1 = "避難開始"
    const string2 = "避難にかかる時間（"
    const hinanKaishiNumber = document.getElementById("hinanKaishiNumber");
    charaHinanKaishiSticker.src = createSticker1(ctxHinanKaishiSticker,canvasHinanKaishiSticker,hinanKaishiNumber.value,string1,string2)

    penStatus = "hinanKaishiSticker";
})


function createSticker1(ctxSticker,canvasSticker,timeNumber,string1,string2){
        // console.log("in createStikcer1")
        //クリア
        ctxSticker.clearRect(0, 0, canvasSticker.width, canvasSticker.height);
        //四角で塗りつぶし
        ctxSticker.fillStyle = 'white';
        ctxSticker.fillRect(0, 0, canvasSagyouTimeSticker.width, canvasSagyouTimeSticker.height);
        
        //矢印を描く
        // パスをリセット
        ctxSticker.beginPath () ;
        // 線を引くスタート地点に移動 
        ctxSticker.moveTo( 0, 30 ) ;
        // スタート地点から(200,200)まで線を引く
        ctxSticker.lineTo( 300, 30 )
        // 線を引くスタート地点に移動 
        ctxSticker.moveTo( 5, 0 ) ;
        // スタート地点から(200,200)まで線を引く
        ctxSticker.lineTo( 5, 60 )
        //三角
        ctxSticker.moveTo(300,10); //最初の点の場所
		ctxSticker.lineTo(300,50); //2番目の点の場所
		ctxSticker.lineTo(320,30); //3番目の点の場所
		ctxSticker.closePath();	//三角形の最後の線 closeさせる
        // 線の色
        ctxSticker.strokeStyle = "red" ;
        ctxSticker.fillStyle = " red "
        // 線の太さ
        ctxSticker.lineWidth = 10 ;
        // 線を描画する
        ctxSticker.stroke();
        ctxSticker.fill();



        //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
        ctxSticker.textBaseline = 'top';
        ctxSticker.textAlign = 'left';
        //文字のスタイルを指定
        ctxSticker.font = 'bold 50px serif';
        ctxSticker.fillStyle = 'blue';
        ctxSticker.fillText(string1, 10, 50);
        ctxSticker.font = '40px serif';
        ctxSticker.fillText(string2, 10, 110);
        ctxSticker.fillText(timeNumber, 400, 110);
        ctxSticker.fillText("）分", 470, 110);
        //一時保存
        base64name = canvasSticker.toDataURL();
        window.localStorage.setItem("saveKey", base64name); //https://www.yoheim.net/blog.php?q=20120204
        // charaSagyouTimeSticker.src = base64name
        return base64name;
}


//スタンプの設置
//スタンプ画像の設定
const charaNameSticker = new Image();
// charaNameSticker.src = nameStickerURL; //"tmp/tmp_nameSticker.png"
const charaDoubleCircle = new Image();
charaDoubleCircle.src = "image/DoubleCircle.png"
const charaSingleCircle = new Image();
charaSingleCircle.src = "image/SingleCircle.png"
const charaArrow = new Image();
charaArrow.src = "image/arrow.png"
// const charaHinanJunbi = new Image();
// charaHinanJunbi.src = "image/HinanJunbi400.png"
const charaSagyouTimeSticker = new Image();
const charaHinanKaishiSticker = new Image();

// const cursorName = new Image();
// cursorName.src = "nameSticker.png";

//canvasをクリックしたときのイベント設定
this.canvasPaint.addEventListener("mousedown",(e) => {
    // let x = e.offsetX-25;
    // let y = e.offsetY-25;
    let x = e.offsetX * canvasFactor ;
    let y = e.offsetY * canvasFactor ;

    console.log("offsetX:",e.offsetX,"offsetY:",e.offsetY);
    console.log("x:",x," y:",y);

    //penStatusの状態に応じて挙動変更
    console.log("Penstatus;",penStatus);
      if(penStatus == "nameSticker") {
        ctxPaint.drawImage(charaNameSticker,x,y-40);
      } else if(penStatus == "doubleCircle"){
        ctxPaint.drawImage(charaDoubleCircle,x,y);
      } else if(penStatus == "singleCircle"){
        ctxPaint.drawImage(charaSingleCircle,x,y);
      } else if(penStatus == "arrow"){
        ctxPaint.drawImage(charaArrow,x-10,y-25);
      } else if(penStatus == "hinanJunbi"){
        ctxPaint.drawImage(charaHinanJunbi,x,y-25);
      } else if(penStatus == "sagyouTimeSticker"){
        ctxPaint.drawImage(charaSagyouTimeSticker,x,y);
      } else if(penStatus == "hinanKaishiSticker"){
        // console.log("pen is hinankaishi")
        ctxPaint.drawImage(charaHinanKaishiSticker,x,y);
      } else if(penStatus == "camera5"){
        ctxPaint.drawImage(charaCamera5,x+25,y+25);
      } else if(penStatus == "eraser"){
        ctxPaint.clearRect(x,y,eraserWidth,eraserHeight);
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
let penSize = 5;
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
        ctxPaint.clearRect(x,y,eraserWidth,eraserHeight);
    }
    
    x = x2;
    y = y2;
}
function drawLine(x1,y1,x2,y2){
    ctxPaint.beginPath();
    ctxPaint.moveTo(x1,y1);
    ctxPaint.lineTo(x2,y2);
    ctxPaint.strokeStyle = ctxPaint.fillStyle;
    ctxPaint.lineWidth = penSize * canvasFactor;
    ctxPaint.stroke();
}
canvasPaint.addEventListener("mousedown",(e)=>{
    isDrag = true;
    x = e.offsetX * canvasFactor;
    y = e.offsetY * canvasFactor;
    // console.log(x,y)
});
canvasPaint.addEventListener("mouseup",()=>{
    isDrag = false;
    x = undefined;
    y = undefined;
});
canvasPaint.addEventListener("mousemove",(event)=>{
    draw(event.offsetX * canvasFactor ,event.offsetY * canvasFactor);
});


//キャンバスに入ったときにマウスカーソルの変更
let cursor = document.querySelector(".mouse");

canvasPaint.addEventListener("mouseenter",(event)=>{
    // console.log("mouse enter");
    switch(penStatus){
        case "nameSticker":
            // canvasPaint.style.cursor = "url(tmp/tmp_nameSticker.png), auto";
            // canvasPaint.style.cursor = "url(" + nameStickerURL + ", auto";
            canvasPaint.style.cursor = "url('nameSticker.png'), auto";
            // canvasPaint.style.cursor = "url(school.cur), auto";
            console.log("nameSticker cursor")
            // console.log("url(" + cursorName.src + "), auto");
            break;
        case "doubleCircle":
            canvasPaint.style.cursor = "url('image/DoubleCircle15.png'),auto";
            break;
        case "singleCircle":
            canvasPaint.style.cursor = "url('image/SingleCircle15.png'),auto";
            break;
        case "arrow":
            canvasPaint.style.cursor = "url('image/arrow3.png'),auto";
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


//downloadボタンの実装
const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click",(e) => {

    console.log("contactButton is clicked.");

    // contactCtx2(saveImage,ctxSheet,ctxPaint);

    ctxContact.clearRect(0,0,canvasContact.width,canvasContact.height);

    let image1 = createImage(ctxSheet);
    image1.onload = function(){
        ctxContact.drawImage(image1,0,0,original_width,original_height);
    }

    let image2 = createImage(ctxPaint);
    image2.onload = function(){
        ctxContact.drawImage(image2,0,0,original_width,original_height);
    }


    // contactCtx(ctxSheet,ctxPaint);

    // 500ms 待ってから保存
    setTimeout(function(){
        console.log("save function start")
        let link = document.createElement("a");
        link.href = canvasContact.toDataURL("image/png");
        link.download = "test.png";
        link.click();    
    },500)

}); 

let createImage= function(context){
    var image= new Image
    image.src= context.canvas.toDataURL()
    return image
}


