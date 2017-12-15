class Player extends collideWorld{
	constructor(image, label,speedX, speedY, cursors){
		super(game.width/2, game.height, image, label, speedX, speedY);
		this.cursors = cursors;
	}

	changeSpeedX(speedX){
		super.changeSpeed(speedX,0);
	}

	changeSpeedY(speedY){
		super.changeSpeed(0,speedY);
	}

	update(){
		if (this.cursors..isDown)
    	{
       	 	player.changeSpeedX(-250);
    	}
    	else if (this.cursors.right.isDown)
    	{
        	player.changeSpeedX(250);
    	}
    	else
    		player.changeSpeedX(0);
	}
}