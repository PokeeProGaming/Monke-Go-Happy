
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var ground;
var jungle ,jungleImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  jungleImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  

  
  
  jungle = createSprite(200,200,400,400);
  jungle.addImage(jungleImage);
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  ground.visible = false;
  
  monkey = createSprite(80,350,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.1
  
  foodGroup = new Group();
  obstacleGroup = new Group();
    
  
  

  
}


function draw() {
  background("white");
  
  if(ground.x<0){
    
    ground.x = ground.width/2;
  
  }
  
  if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
  
    monkey.collide(ground);
  
  if(foodGroup.isTouching(monkey)){
    score = score + 2;
    foodGroup.destroyEach();
  }
  
  

  
  
  spawnBanana();
  
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 250,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
  
  

  
}

function spawnBanana(){
    if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 200;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacleGroup.add(obstacle);
  }
}



