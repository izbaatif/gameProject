/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;

var livesCount;

var jumpSound;
var coinSound;
var looseSound;
var victorySound;

var platforms;

function preload()
{
    soundFormats('mp3','wav');

    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    coinSound = loadSound('assets/collectCoin.wav');
    coinSound.setVolume(0.1);
    
    looseSound = loadSound('assets/loose.wav');
    looseSound.setVolume(0.1);
    
    victorySound = loadSound('assets/winGame.wav');
    victorySound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    
    lives= 3;
    
    startGame()

}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    push();    
    translate(scrollPos,0);

    drawClouds();
    drawMountains();
    drawTrees();
    drawLives();
    
    for(var i=0; i<platforms.length; i++)
        {
            platforms[i].draw();
        }

    for(var i=0; i<canyons.length; i++)
        {  
               drawCanyon(canyons[i]);
               checkCanyon(canyons[i]);
        }

    
    for( var i=0; i<collectables.length; i++)
        {  
            if(!collectables[i].isFound)
             {
               checkCollectable(collectables[i])
               drawCollectable(collectables[i])
             }
        }
    
    
    renderFlagpole() 
    pop();
    
	drawGameChar();
    
    
    checkPlayerDie();
    
    fill(255,255,0);
    noStroke();
    textSize(20);
    text("Score: " + game_score, 20, 27);

    textSize(20);
    text("Lives: ", 130, 27)
    
        
    
	if(isLeft)
	   {
		  if(gameChar_x > width * 0.2)
		      {
			     gameChar_x -= 5;
		      }
		  else
		      {
			     scrollPos += 5;
		      }
	   }

	if(isRight)
	   {
		  if(gameChar_x < width * 0.8)
		      {
			     gameChar_x  += 5;
		      }
		  else
		      {
			     scrollPos -= 5; 
		      }

        }

        
    if(gameChar_y < floorPos_y)
        {
            var isContact=false; 
            for (var i=0; i<platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x,gameChar_y))
                        {
                            isContact=true
                            break;
                        }
                }
            
            if(isContact==false)
                {
                    isFalling=true
                    gameChar_y+=2
                }
           
        }
    else 
        {
                isFalling=false
        }
    
    if(flagpole.isReached==false)
        {
            checkFlagpole()
        }
    

	gameChar_world_x = gameChar_x - scrollPos;
    
    if(flagpole.isReached==true)
        {
            fill(255);
            textSize(40);
            text("Level Completed! Press spacebar to continue.", 180, height/2)
        }
    if(lives<=0)
        {
            fill(255);
            textSize(40);
            text("Game Over! Press spacebar to continue.", 180, height/2)
            
        }
} 

function keyPressed(){

	console.log("press" + keyCode);
	console.log("press" + key);
    
    if(keyCode==37)
        {
            isLeft=true;
        }
    else if(keyCode==39)
        {
            isRight=true;
        }
    else if(keyCode==32 && gameChar_y==floorPos_y )
        {
            isFalling=true;
            gameChar_y=floorPos_y-100;
            jumpSound.play();
        }
    if(keyCode==32 && flagpole.isReached==true)
        {
            location.reload(true)
        }
    else if(keyCode==32 && lives<=0)
        {
            location.reload(true)
        }

}

function keyReleased()
{

	console.log("release" + keyCode);
	console.log("release" + key);
    
    if(keyCode==37)
        {
            isLeft=false;
        }
    else if(keyCode==39)
        {
            isRight=false;
        }
    if(keyCode==32)
        {
            isFalling=false;
        }

}


function drawGameChar()
{
	
    if(isLeft && isFalling)
	{
        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x,gameChar_y-73,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x-2,gameChar_y-10,10,25);
        ellipse(gameChar_x-8,gameChar_y-40,25,10);
        ellipse(gameChar_x+8,gameChar_y-35,25,10);
        ellipse(gameChar_x+8,gameChar_y-12,25,10);
        ellipse(gameChar_x-5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x-5,gameChar_y-28,20,25);    

	}
    
	else if(isRight && isFalling)
	{

        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x,gameChar_y-73,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x+2,gameChar_y-10,10,25);
        ellipse(gameChar_x+8,gameChar_y-40,25,10);
        ellipse(gameChar_x-8,gameChar_y-35,25,10);
        ellipse(gameChar_x-8,gameChar_y-12,25,10);
        ellipse(gameChar_x+5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x+5,gameChar_y-28,20,25);
        
	}
    
    else if(isLeft)
	{
        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x,gameChar_y-73,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x-2,gameChar_y-10,10,25);
        ellipse(gameChar_x-5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x-5,gameChar_y-28,20,25);
    

	}
	else if(isRight)
	{
        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x,gameChar_y-73,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x+2,gameChar_y-10,10,25);
        ellipse(gameChar_x+5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x+5,gameChar_y-28,20,25);
    
    }
	
    else if(isFalling || isPlummeting)
	{
        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x-7,gameChar_y-70,8,8);
        ellipse(gameChar_x+7,gameChar_y-70,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x-8,gameChar_y-40,25,10);
        ellipse(gameChar_x+8,gameChar_y-40,25,10);
        ellipse(gameChar_x-8,gameChar_y-12,25,10);
        ellipse(gameChar_x+8,gameChar_y-12,25,10);
        ellipse(gameChar_x-5,gameChar_y-60,5,5);
        ellipse(gameChar_x+5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x,gameChar_y-28,20,25);

	}
	
    else
	{ 
        fill(0);
        noStroke();
        strokeWeight(2);
        ellipse(gameChar_x-7,gameChar_y-70,8,8);
        ellipse(gameChar_x+7,gameChar_y-70,8,8);
        fill(255);
        stroke(0);
        ellipse(gameChar_x,gameChar_y-60,25,25);
        fill(0);
        ellipse(gameChar_x-8,gameChar_y-10,10,25);
        ellipse(gameChar_x+8,gameChar_y-10,10,25);
        ellipse(gameChar_x-5,gameChar_y-60,5,5);
        ellipse(gameChar_x+5,gameChar_y-60,5,5);
        ellipse(gameChar_x,gameChar_y-28,30,40);
        fill(255);
        ellipse(gameChar_x,gameChar_y-28,20,25);
    }


}


function drawClouds()
{
    for(var i=0;  i < clouds.length; i++)
        {
            fill(255,255,255);
            ellipse(clouds[i].x_pos +30, clouds[i].y_pos+30,clouds[i].size,clouds[i].size);
            ellipse(clouds[i].x_pos -30, clouds[i].y_pos+30,clouds[i].size,clouds[i].size);
            ellipse(clouds[i].x_pos, clouds[i].y_pos,clouds[i].size, clouds[i].size);
        }
}




function drawMountains()
{
    for( var i=0; i<mountains.length; i++)
        {
            noStroke();
            fill(200);
            triangle(mountains[i].x_pos, floorPos_y, mountains[i].x_pos+ mountains[i].width , floorPos_y, mountains[i].x_pos+mountains[i].width /2, floorPos_y-332);
        }
    
}


function drawTrees()
{
    for( var i=0;  i < trees_x.length; i++ )
        {
            fill(0,200,0);
            stroke(0,100,0);
            strokeWeight(5);
            rect(trees_x[i]-90,floorPos_y-200,20,50);
            rect(trees_x[i]-90,floorPos_y-150,20,50);
            rect(trees_x[i]-90,floorPos_y-100,20,50);
            rect(trees_x[i]-90,floorPos_y-50,20,50);
            rect(trees_x[i]-40,floorPos_y-150,20,60);
            rect(trees_x[i]-40,floorPos_y-90,20,40);
            rect(trees_x[i]-40,floorPos_y-50,20,50);
            rect(trees_x[i],floorPos_y-232,20,50);
            rect(trees_x[i],floorPos_y-182,20,30);
            rect(trees_x[i],floorPos_y-152,20,50);
            rect(trees_x[i],floorPos_y-102,20,60);
            rect(trees_x[i],floorPos_y-42,20,42);
            noStroke();
        }

}


function drawCanyon(t_canyon)
{
            fill(100,155,255);
            rect(t_canyon.x_pos, floorPos_y, t_canyon.width, 144);
	        fill(255);
            fill(173,216,230);
            rect(t_canyon.x_pos, floorPos_y+124, t_canyon.width , 20);
            fill(222,184,135);
            triangle(t_canyon.x_pos,576, t_canyon.width/12 + t_canyon.x_pos ,576,t_canyon.x_pos, floorPos_y);
            triangle(t_canyon.x_pos+ t_canyon.width, 576, t_canyon.x_pos+ t_canyon.width, floorPos_y,t_canyon.x_pos+ t_canyon.width- t_canyon.width/12,576);

}

function drawLives()
{   
    for(var i=0; i<lives ; i++)
        {
            strokeWeight(2)
            stroke(0);
            fill(0);
            ellipse(193 + [i]*30,10,8,8);
            ellipse(207 + [i]*30,10,8,8);
            fill(255);
            stroke(0);
            ellipse(200 + [i]*30,20,25,25);
            fill(0);
            ellipse(195 + [i]*30,20,5,5);
            ellipse(205 + [i]*30 ,20,5,5);
            noStroke();
        }
}




function checkCanyon(t_canyon)
{
    if(gameChar_world_x > t_canyon.x_pos+20 && gameChar_world_x < t_canyon.x_pos+ t_canyon.width-20 && gameChar_y>= floorPos_y)
        {
            isPlummeting=true
            gameChar_y+=2
            gameChar_y==height
            isLeft=false
            isRight=false
            looseSound.play();
        }
    
}


function drawCollectable(t_collectable)
{
            fill(255,255,0);
            ellipse(t_collectable.x_pos, t_collectable.y_pos,t_collectable.size,t_collectable.size);
            fill(255,200,0);
            noStroke();
            ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size/2, t_collectable.size/2);
        
}



function checkCollectable(t_collectable)
{
           if(dist(gameChar_world_x, gameChar_y ,t_collectable.x_pos, t_collectable.y_pos)<=t_collectable.size)
            {
                t_collectable.isFound=true;
                game_score +=1;
                coinSound.play();
            }
            
}

function renderFlagpole()
{
    push();
    floorPos_y
    strokeWeight(5);
    stroke(255);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-200)
    fill(255,0,0);
    noStroke();
    
    if(flagpole.isReached)
        {
            triangle(flagpole.x_pos, floorPos_y - 200, flagpole.x_pos+ 60, floorPos_y-175, flagpole.x_pos, floorPos_y-150)
        }
    else
        {
            triangle(flagpole.x_pos, floorPos_y - 50, flagpole.x_pos+ 60, floorPos_y-25, flagpole.x_pos, floorPos_y)
        }
    pop()
            
}

function checkFlagpole()
{
    var d= abs(gameChar_world_x - flagpole.x_pos)
    
    if(d < 20)
        {
            flagpole.isReached=true
            victorySound.play();
        }
}

function checkPlayerDie()
{
   if(abs(height-gameChar_y)<10)
       {
         if(lives>0)
             {
                 lives--;
                 startGame();
             }
       }
}


function startGame()
{
    gameChar_x = width/6;
	gameChar_y = floorPos_y;

	
	scrollPos = 0;

	gameChar_world_x = gameChar_x - scrollPos;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

    
   trees_x=[100, 450, 800, 1300, 1900, 2200, 2900, 3300, 3900]
    
    clouds=[
             {x_pos:20, y_pos:70, size:70},
             {x_pos:400, y_pos:90, size:70},
             {x_pos:900, y_pos:100, size:70},
             {x_pos:1200, y_pos:70, size:70},
             {x_pos:1900, y_pos:115, size:70},
             {x_pos:2300, y_pos:90, size:70},
             {x_pos:3000, y_pos:85, size:70},
             {x_pos:3800, y_pos:70, size:70}
            ]
    
    mountains=[
               {x_pos:120, width:300},
               {x_pos:800, width:200},
               {x_pos:1300, width:250},
               {x_pos:1800, width:300},
               {x_pos:2400, width:240},
               {x_pos:3200, width:300}
              ]
    
    canyons=[
             {x_pos:600, width:50},
             {x_pos:1000, width:150},
             {x_pos:1700, width:100},
             {x_pos:3000, width:150},
             {x_pos:3500, width:150}
            ]
    
    collectables=[
                   {x_pos:350, y_pos:300, size:50, isFound:false},
                   {x_pos:550, y_pos:405, size:50, isFound:false},
                   {x_pos:920, y_pos:405, size:50, isFound:false},
                   {x_pos:1200, y_pos:405, size:50, isFound:false},
                   {x_pos:1600, y_pos:405, size:50, isFound:false},
                   {x_pos:2050, y_pos:305, size:50, isFound:false},
                   {x_pos:2500, y_pos:405, size:50, isFound:false},
                   {x_pos:2900, y_pos:405, size:50, isFound:false},
                   {x_pos:3450, y_pos:305, size:50, isFound:false},
                   {x_pos:3700, y_pos:405, size:50, isFound:false}   
                 ]
    platforms=[];
    
    platforms.push( createPlatforms (300, floorPos_y-100, 150) )
    platforms.push( createPlatforms (2000, floorPos_y-100, 150) )
    platforms.push( createPlatforms (3420, floorPos_y-100, 250) )
    
    
    game_score= 0;
    
    flagpole={isReached: false, x_pos:4000}
    
}

function createPlatforms(x, y, length)
{
    var p=
        {
            x:x,
            y:y,
            length:length,
            draw:function()
            {
                fill(101,67,33)
                rect(this.x, this.y, this.length, 20);
                fill(0,255,0)
                rect(this.x,this.y,this.length, 10);
            },
            checkContact:function(gc_x, gc_y)
            {
                if(gc_x> this.x &&  gc_x<this.x+this.length)
                    {
                         var d= this.y - gc_y
                         if(d >=0 && d<5)
                           {
                               return true;
                           }
                    }
                 return false;  
            }
        }
    return p;
}

