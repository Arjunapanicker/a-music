song1="";
song2="";
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;
function setup()

{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO)
     video.hide();

     poseNet = ml5.poseNet(video,modeLoaded);
     poseNet.on('pose', gotposes);
}
function modeLoaded()
{
console.log('PoseNet Is Intialized');

}
function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreLeftWrist = results[0].pose.keypoints[9].score;
         console.log("scoreLeftWrist = "+ scoreLeftWrist);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = "+RightWristX+"RightWristY"+RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LefttWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+LeftWristX+"LeftWristY"+LeftWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    fill("FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
      circle(LeftWristX,LeftWristY,20);
       song1.stop();
      song2.play();
      document.getElementById("song").innerHTML = "playing Harry Potter Song";

    }
    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);
       song2.stop();
       song1.play();
       document.getElementById("song").innerHTML = "playing Peter Pan Song";
    }
}
function play(){
    
song1.play();
song1.setVolume(1);
song1.rate(1);
}