class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(100,200);
      runner1.setAnimation(runner1Img);
      runner2 = createSprite(200,200);
      runner2.setAnimation(runner2Img)
      runner3 = createSprite(300,200);
      runner3.setAnimation(runner3Img);
      runner4 = createSprite(400,200);
      runner4.setAnimation(runner4Img);
      runners = [runner1, runner2, runner3, runner4];
    }
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
  
      
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        
        //index of the array
        var index = 0;
        background("black");
        image(pathImg, 0, -windowHeight*4, windowWidth, windowHeight*5);
        //x and y position of the cars
        var x = 200;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = windowHeight - allPlayers[plr].distance;
          
  
          if (index === player.index){
            stroke(10)
            fill("red")
            ellipse(x,y,70,70);
            runners[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = runners[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
  
      console.log(player.distance);
      if(player.distance > 4420){
        gameState = 2;
        player.rank += 1
        Player.updateCarsAtEnd(player.rank);
        
      }
      drawSprites();
    }
    end(){
        console.log("Game Over.")
        console.log(player.rank);
    }
  }
