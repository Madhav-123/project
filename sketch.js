var knife,sword,fruit;
var fruit1,fruit2,fruit3,fruit4;
var alien,alien1,alien2;
var end,over,fin;
var gamestate=0;
var score=0;
var cut;

function preload(){
  knife=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  alien1=loadImage("alien1.png")
  alien2=loadImage("alien2.png")
  over=loadImage("gameover.png")
  cut=loadSound("knifeSwooshSound.mp3")
  fin=loadSound("gameover.mp3")
 
}
function setup(){
  createCanvas(400,400)
  sword=createSprite(150,150,10,10)
  sword.addImage(knife)
  sword.scale=0.5
    
  end=createSprite(200,200,10,10)
  end.addImage(over)
  end.visible=false;
  sword.visible=true;
  
  
  
  Fruitgroup=new Group()
  aliens=new Group()
  
}
function draw(){
  background("#c9720d")
  sword.x=mouseX
  sword.y=mouseY
  
  sword.debug=true
  sword.setCollider("circle",30,-20,30)
  
   if(Fruitgroup.isTouching(sword) && gamestate===0){
   Fruitgroup.destroyEach()
     score=score+1;
     cut.play()
   }
  
  
  
  if(aliens.isTouching(sword) && gamestate===0){
    
    end.visible=true
    sword.visible=false
    gamestate=1
    fin.play()  
  }
  stroke("black")
  if (gamestate=== 1){
    textSize(20)
  stroke("black")
  text("press space to reset",140,230)
  }
   if(Fruitgroup.isTouching(aliens)){
      aliens.collide(Fruitgroup)
    }
 
  text("score:"+score,300,20)
  
  fruits()
 alien()
  reset()
drawSprites()
  
}
function fruits(){
  if(World.frameCount%80===0){
   fruit=createSprite(430,150,10,10)
    fruit.scale=0.2;
    r=Math.round(random(1,4))
    
    if(r===1){
      fruit.addImage(fruit1)
    }else if (r===2){
      fruit.addImage(fruit2)
    }else if(r===3){
      fruit.addImage(fruit3)
    }else if(r===4){
      fruit.addImage(fruit4)
    }
    
    fruit.y=Math.round(random(20,280))
    
    fruit.velocityX=-6-score;
    fruit.velocityY=0.5
    fruit.lifetime=100;
   
    Fruitgroup.add(fruit)
    Fruitgroup.depth=end.depth;
    end.depth=end.depth+1
  }
}
function alien(){
  if(World.frameCount%50-score===0){
var alien=createSprite(420,200,10,10)
  
l=Math.round(random(1,2))
    if(l===1){
      alien.addImage(alien1)
    }else if(l===2){
      alien.addImage(alien2)
    }
    alien.y=Math.round(random(20,380))
    alien.lifetime=100;
    alien.velocityX = -6-score; 
    alien.velocityY=0.7;
    aliens.add(alien)
    aliens.depth=end.depth;
    end.depth=end.depth+1
}
    
}
function reset(){
  if(keyDown("space")){
    
    end.visible=false
    sword.visible=true
    score=0;
    gamestate=0
  }
}