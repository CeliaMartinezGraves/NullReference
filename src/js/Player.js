class Player extends collideWorld{
	constructor( label,speedX, speedY, cursors){
		super(game.width/2, game.height, label, speedX, speedY);
		this.cursors = cursors;
		this.gancho = new Gancho(1,'hook', this);

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

    	if (this.cursors.fireButton.downDuration(0.2) && !this.hayGancho){
    		this.gancho.create();
    		this.hayGancho = true;
    	}
    	//if(this.gancho === null){
    	//	this.hayGancho = false;
    	//}
    	if(this.hayGancho){
    		this.gancho.update();
    	}

	}
	render(){
		if(this.hayGancho){
			this.gancho.render();
		}
	}

	killGancho(){
		this.gancho.die();
		this.hayGancho = false;
	}
}