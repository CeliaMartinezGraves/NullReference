class Player extends collideWorld{
	constructor(image, label,speedX, speedY, cursors){
		super(game.width/2, game.height, image, label, speedX, speedY);
		this.cursors = cursors;
		this.gancho = new Gancho(2, 'images/hookTop.png','hook', this);

		this.hayGancho = false;

	}

	preload(){
		super.preload();
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
       	 	this.changeSpeedX(-250);
    	}
    	else if (this.cursors.right.isDown)
    	{
        	this.changeSpeedX(250);
    	}
    	else
    		this.changeSpeedX(0);

    	if (fireButton.downDuration(0.2)){
    		this.gancho.fire();
    		this.hayGancho = true;
    	}
    	if(this.hayGancho){
    		this.gancho.update();
    	}
	}
	render(){
		if(this.hayGancho){
			this.gancho.render();
		}
	}
}