class Player extends collideWorld{
	constructor(image, label,speedX, speedY, cursors){
		super(game.width/2, game.height, image, label, speedX, speedY);
		this.cursors = cursors;
		this.gancho = new Gancho(2, 'images/hookTop.png','hook', this);

		this.hayGancho = false;

	}

	preload(){
		super.preload();
		this.gancho.preload();
	}

	create(){
		super.create();
		this.gancho.create();
	}

	changeSpeedX(speedX){
		super.changeSpeed(speedX,0);
	}

	changeSpeedY(speedY){
		super.changeSpeed(0,speedY);
	}

	update(){

		if (this.cursors.left.isDown)
    	{
       	 	this.changeSpeedX(-250);
    	}
    	else if (this.cursors.right.isDown)
    	{
        	this.changeSpeedX(250);
    	}
    	else
    		this.changeSpeedX(0);

    	if (this.cursors.fireButton.downDuration(0.2)){
    		this.gancho.bulletKey = this.gancho.label;
    		this.gancho.fire();
    		this.hayGancho = true;
    	}
    	//if(this.hayGancho){
    	//	this.gancho.update();
    	//}
	}
	render(){
		//if(this.hayGancho){
		//	this.gancho.render();
		//}
	}
}