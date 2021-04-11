const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world;
var box1, box2,box3,box4,box5;
var pig1,pig2;
var log1,log2,log3,log4;
var bird1, backImg;
var platform;
var consLog;
var shot;
var score = 0;
var gameState = "onSling";
var bg;

function preload(){
   getBackgroundImage();
    
}

function setup(){

    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    log1 = new Log(810,260,300,PI/2);
    log2 = new Log(810,180,300,PI*1/2);
    log3 = new Log(760,120,150,PI/7);
    log4 = new Log(870,120,150,-PI/7);
   // consLog = new Log(230,180,80,PI/2);

    pig1 = new Pig(810,350);
    pig2 = new Pig(810,220);

    bird1 = new Bird(200,50);

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150,305,300,170);   
    
    shot = new Slingshot(bird1.body,{x:200,y:40});

}

function draw(){
    getBackgroundImage();
    if(backImg){
    background(backImg);
    }

    textSize(35);
    fill(255);
    text("Score -"+score,width-300,50);


    Engine.update(engine);
    
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();

    log1.display();
    log2.display();
    log3.display();
    log4.display();
    //consLog.display();

    bird1.display();

    ground.display();
    platform.display();

    shot.display();

}

function mouseDragged(){
    if(gameState !== "launched"){
      Body.setPosition(bird1.body,{x: mouseX,y: mouseY})
    }
}

function mouseReleased(){
    shot.fly();
    gameState = "launched";
}

async function getBackgroundImage(){
    var response =  await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json(); 
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);
    //console.log(hour);

    if(hour>=6 && hour<=19){
        bg = "sprites/bg1.png";
    } else{
        bg= "sprites/bg2.png";
    }
   // console.log(bg);
    backImg = loadImage(bg);
  console.log(bg);
}

function keyPressed(){

    if(keyCode === 32){
      bird1.trajectory = [];
      Matter.Body.setPosition(bird1.body,{x:200,y:50});
      shot.attach(bird1.body);
    }

}







