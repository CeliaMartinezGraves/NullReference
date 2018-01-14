class Player extends collideWorld{
	constructor( label,speedX, speedY, cursors){
		super(game.width/2, game.height, label, speedX, speedY);
		this.cursors = cursors;
		this.gancho = new Gancho(1,'hook', this);

		// añade los frames de cada animacion
		this.addAnim('leftAnim', [4, 5, 6, 7]);
		this.addAnim('rightAnim', [0, 1, 2, 3]);
		this.addAnim('stopAnim', [8]);

		this.hayGancho = false;
	}

	preload(){
		super.preload();
		this.animations.play('stopAnim', this._animSpeed);
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
       	 	this.animations.play('leftAnim', this._animSpeed);
    	}
    	else if (this.cursors.right.isDown)
    	{
        	this.changeSpeedX(250);
        	this.animations.play('rightAnim', this._animSpeed);
    	}
    	else if(this.speedX != 0){
       		this.changeSpeedX(0);
       		this.animations.play('stopAnim', this._animSpeed);
    	}

    	if (this.cursors.fireButton.downDuration(0.2)){
    		//this.animations.play('stopAnim', this._animSpeed);				///Intentar poner animacion de apuntando hacia arriba cuando dispara
    		this.gancho.create();
    		this.hayGancho = true;
    	}
    	
    	if(this.hayGancho){
    		this.gancho.update();
    	}
	}

	killGancho(){
		this.gancho.die();
		this.hayGancho = false;
	}
}