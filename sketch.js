var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja, ninja_running, ninja_collided;
var ground, groungImage, invisibleground;
var cloudsGroup, cloudImage, obstacle, obstacleImage, obstacleGroup;
var obstacle, mask, maskImage, maskGroup;
var score=0;

var gameOver, restart;

var token = 0

function preload(){
  man_running =   loadAnimation("images/ninja/Run__000.png","images/ninja/Run__001.png","images/ninja/Run__002.png","images/ninja/Run__003.png","images/ninja/Run__004.png","images/ninja/Run__005.png","images/ninja/Run__006.png","images/ninja/Run__007.png","images/ninja/Run__008.png","images/ninja/Run__009.png");
  man_collided = loadAnimation("images/ninja/Dead__006.png");
  
  groundImage = loadImage("images/BG.png");
  
  //cloudImage = loadImage("cloud.png");
  
  obstacle1 =loadImage("images/Objects/DeadBush.png");
  obstacle2 =loadImage("images/Objects/Bush (1).png");
  obstacle3 =loadImage("images/Objects/Bush (2).png");
  obstacle4 =loadImage("images/Objects/Crate.png");
  obstacle5 =loadImage("images/Objects/Sign.png");
  obstacle6 =loadImage("images/Objects/Skeleton.png");
  obstacle7 =loadImage("images/Objects/TombStone (1).png");
  obstacle8 =loadImage("images/Objects/TombStone (2).png");
  
  
  gameOverImg = loadImage("images/gameover.jpg");
  restartImg = loadImage("images/restart1.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);





  man = createSprite(50,200,40,50);
  man.addAnimation("running", man_running);
  man.addAnimation("collided", man_collided);
  man.scale = 0.3;
  man.debug=false
 
  
  
  gameOver = createSprite(750,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
 
  restart = createSprite(750,520);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  invisibleGround = createSprite(10,450,4000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstacleGroup = new Group();
  maskGroup = new Group();
  
  score = 0;
}

function draw() {
 
  background("white");
  
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("UP_ARROW") && man.y >= 340) {
      man.velocityY = -12;
    }
  
    man.velocityY = man.velocityY + 0.8
  
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
  
    man.collide(invisibleGround);
   // spawnClouds();
    spawnobstacle();
    /*
    //callong the function mask 
    if(token === 0){
      mask();
      if (man.isTouching(maskGroup)){
        maskGroup.destroyEach();
        maskGroup.Lifetime=0;  
        man.changeAnimation("collided",man_collided)

        token = token +1
        console.log(token)
       }
    
    }  
   */
    if(obstacleGroup.isTouching(man)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    man.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    //maskGroup.setVelocityXEach(0)
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    //maskGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }

  drawSprites();

  fill("white");
  textSize(40)
  text("Score: "+ score, 1400,50);

}
/*
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
*/
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
 // cloudsGroup.destroyEach();
  //maskGroup.destroyEach();
  man.changeAnimation("running", man_running);
  
  score = 0;
 // token = 0;

}

function spawnobstacle() {
  if(frameCount % 130    === 0) {
    var obstacle = createSprite(windowWidth,420,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    var r = Math.round(random(1,6))
    switch(r){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      case 7: obstacle.addImage(obstacle7);
      break;
      default:break;
    }
    
    obstacle.scale=1
    
    //lifetime to the obstacle     
    obstacle.lifetime = 1100;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
/*
function mask(){
   if (score>0 && score % 350=== 0) {
      var mask = createSprite(400 ,100,40,10);

      mask.addImage(maskImage);
      mask.scale = 0.5 ;
      mask.velocityX = -3;

      //assign lifetime to the variable
      mask.lifetime = 400;

      //adjust the depth
      mask.depth = man.depth;
      man.depth = man.depth + 1;

      //add each cloud to the group
      maskGroup.add(mask);
  }   
}
*/








