class Player extends collideWorld{
	constructor(image, label,speedX, speedY){
		super(game.width/2, game.height, image, label, speedX, speedY);
	}

	changeSpeedX(speedX){
		super.changeSpeed(speedX,0);
	}

	changeSpeedY(speedY){
		super.changeSpeed(0,speedY);
	}

	update(){
		if (cursors.left.isDown)
    	{
       	 	player.changeSpeedX(-250);
    	}
    	else if (cursors.right.isDown)
    	{
        	player.changeSpeedX(250);
    	}
    	else
    		player.changeSpeedX(0);
	}
}