/**
 * draw on canvas
 */
var imgPosition = 0;
var goRight = true;
var animate = null;
var showText = false;
function drawCircle(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(200,50,40,0,2*Math.PI);
    ctx.stroke();
}

function drawImage(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("enot");
    ctx.drawImage(img,10,10);

}

function startAnimation(objButton, txtOn, txtOff){
    imgPosition = 0;

    if(animate == null){
        animate = setInterval(drawMovingImage, 500);
        objButton.innerHTML = txtOff;
    }
    else {
        clearTimeout(animate);
        animate = null;
        objButton.innerHTML = txtOn;

    }
}

function drawMovingImage(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("enot");
    var w = c.width;

    ctx.clearRect(0,0,w,c.height);

    if(imgPosition > w - 60){
       goRight = false;
    }
    else if(imgPosition < 0){
       goRight = true;
    }
    if(goRight){
        imgPosition = imgPosition + 10;
    }
    else{
        imgPosition = imgPosition -10;
    }
    console.log("Animating " + imgPosition);
    ctx.drawImage(img,imgPosition,10);

    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.moveTo(0,70);
    ctx.lineTo(400, 70);
    ctx.stroke();

    if(showText) {
        drawText();
    }

}

function drawText(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("This is canvas",10,140);
    showText = true;
}



