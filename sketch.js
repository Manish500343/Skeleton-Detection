let capture;
let posenet;
let singlePose;
let noseX, noseY;
let skeleton,actor_img;
let specs,smoke;
function setup() {
    createCanvas(800, 600);
    capture = createCapture(VIDEO);
    // Uncomment to hide the video element
    capture.hide();
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    actor_img=loadImage('images/shahrukh.png');
    specs= loadImage('images/spects.png');
    smoke= loadImage('images/cigar.png');
}

function receivedPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton=poses[0].skeleton;
        
        reyeX = singlePose.rightEye.x;
        reyeY = singlePose.rightEye.y; // Use nose position, not left eye position

        leyeX = singlePose.leftEye.x;
        leyeY = singlePose.leftEye.y;

        noseX = singlePose.nose.x;
        noseY = singlePose.nose.y;

        console.log(noseX + " " + noseY);
    }
}

function modelLoaded() {
    console.log('model loaded');
}

function draw() {
    // Display the captured video feed
    image(capture, 0, 0);
    fill(255, 0, 0); // Red color
    
    if(singlePose){
        for (let i = 0; i <singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x,
            singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255 );
        strokeWeight(5);
        for(let j=0; j<skeleton.length;j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,
                 skeleton[j][1].position.x,skeleton[j][1].position.y);
        }
        image(specs,singlePose.nose.x-90,singlePose.nose.y-120,180,180);
        image(smoke,singlePose.nose.x-120,singlePose.nose.y+50,100,100);

        // image(actor_img,singlePose.nose.x-100,singlePose.nose.y-120,180,180);
    }
}