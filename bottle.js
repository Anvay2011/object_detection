img="";
img="";
objects=[];
status="";
function preload(){
    img=loadImage('bottles.jpg');
}
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector("Cocossd",modelLoaded);

    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function draw(){
    image(img,0,0,640,420);
   
    if(status!=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            stroke("red");
            rect(objects[i].x-10,objects[i].y-15,objects[i].width,objects[i].height-5);
        }
    }
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function back(){
    window.location = "index.html";
}