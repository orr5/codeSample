//Globals
var resize=null,
    limitSm = 768,
    limitMd= 960,
    limitLg = 1280,
    loadedSm = false,
    loadedMd = false,
    loadedLg= false,
    loadedXl = false;

function loadSm(){
    console.log("Load script for small screen");
    alert("Load script for small screen");
}

function loadMd(){
    console.log("Load script for medium screen");
    alert("Load script for medium screen");
}

function loadLg(){
    console.log("load script for large screen");
    alert("load script for large screen");
}

function loadXl(){
    console.log("Load script for x-large screen");
    alert("Load script for x-large screen")
}

function logistics(){
    var cw = document.documentElement.clientWidth;
    if(cw < limitSm){
        if(!loadedSm){
            loadSm();
            loadedSm = true;
        }
    }
    else if(cw < limitMd){
        if(!loadedMd){
            loadMd();
            loadedMd = true;
        }
    }
    else if(cw < limitLg){
        if(!loadedLg){
            loadLg();
            loadedLg = true;
        }
    }
    else{
        if(!loadedXl){
            loadXl();
            loadedXl = true;
        }
    }
}

//Screen size reload
window.onload = logistics();
window.onresize = function(){
    if(resize != null){
        clearTimeout();
    }
    resize = setTimeout(function(){
        console.log("Window resizes");
        logistics();
    }, 750);
};
