class Player extends collideWorld{
	constructor(image, label,speedX, speedY, cursors){
		super(game.width/2, game.height, image, label, speedX, speedY);
		this.cursors = cursors;
		this.gancho = new Gancho(2, 'images/hook.png','hook');		
	}

	preload(){
		super.preload();
		this.gancho.preload();
	}

	changeSpeedX(speedX){
		super.changeSpeed(speedX,0);
	}

	changeSpeedY(speedY){
		super.changeSpeed(0,speedY);
	}

	update(){
		if (this.cursors.fire.isDown)
    	{
       	 	player.changeSpeedX(-250);
       	 	this.gancho.carga();
    	}
    	else if (this.cursors.right.isDown)
    	{
        	player.changeSpeedX(250);
    	}
    	else
    		player.changeSpeedX(0);

    	if (fireButton.downDuration(0.2))
    		this.gancho.fire();
	}
}