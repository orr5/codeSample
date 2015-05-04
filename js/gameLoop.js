/**
 * Game loop - animating a simple image
 * please read http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
 * for more details
 */

var  imgToAnimate,  //image we will animate
    fpsDisplay = document.getElementById('fpsDisplay'),
    imgPos = 10,  //initial position of image
    imgLastPos = 10,
    imgVelocity = 0.08,
    limit = 300,  //how far image can go
    lastFrameTimeMs = 0,
    maxFPS = 60,  //our max rame rate
    delta = 0,
    timestep = 1000 / 60,  //time for one step
    fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    running = false,
    started = false,
    frameID = 0;

/*
Function to update location
 */
function update(delta) {
    imgLastPos = imgPos;
    imgPos += imgVelocity * delta;
    // Switch directions if we go too far
    if (imgPos >= limit || imgPos <= 0) imgVelocity = -imgVelocity;
}

/*
function to render
 */
function render(interp) {
    if(imgToAnimate == undefined)  imgToAnimate = document.getElementById('imgToAnimate');
    if(fpsDisplay == undefined || fpsDisplay == null) fpsDisplay = document.getElementById('fpsDisplay');
    imgToAnimate.style.left = (imgLastPos + (imgPos - imgLastPos) * interp) + 'px';
    fpsDisplay.textContent = Math.round(fps) + ' FPS';
}

/*
Function to call on case we are doing too many updates
 */
function panic() {
    delta = 0;
}

function begin() {
}

/*
Update image background based on FPS rate
 */
function end(fps) {
    if (fps < 25) {
        imgToAnimate.style.backgroundColor = 'black';
    }
    else if (fps > 30) {
        imgToAnimate.style.backgroundColor = 'red';
    }
}

/*
Stop animation
 */
function stop() {
    running = false;
    started = false;
    cancelAnimationFrame(frameID);
}

/*
Start animation
 */
function start() {
    imgToAnimate = document.getElementById('imgToAnimate');
    if (!started) {
        started = true;
        //render initial state
        frameID = requestAnimationFrame(function(timestamp) {
            render(1);
            running = true;
            lastFrameTimeMs = timestamp;
            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
            frameID = requestAnimationFrame(mainLoop);
        });
    }
}

/*
Game loop
 */
function mainLoop(timestamp) {
    // Throttle the frame rate.
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        frameID = requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    begin(timestamp, delta);

    if (timestamp > lastFpsUpdate + 1000) {
        fps = 0.25 * framesThisSecond + 0.75 * fps;

        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;

    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            panic();
            break;
        }
    }

    render(delta / timestep);

    end(fps);

    frameID = requestAnimationFrame(mainLoop);
}

//start();  //enable to start on page load
