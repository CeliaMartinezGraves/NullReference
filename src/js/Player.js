class Player extends collideWorld{
	constructor(label, speedX, speedY, cursors, playerID){ // PLAYERID ES SI ES PLYR 1, 2, etc
		super(game.width/2, game.height, label, speedX, speedY);
		if(playerID === 1){
			this.moveTo((game.width/2)-this.width/4, this.y);
		}
		this.cursors = cursors;
		this.gancho = new Gancho('hook', this);

		// añade los frames de cada animacion
		this.addAnim('leftAnim', [4, 5, 6, 7]);
		this.addAnim('rightAnim', [0, 1, 2, 3]);
		this.addAnim('stopAnim', [8]);

		this.addAnim('finAnim', [0, 1, 0, 1, 4, 5, 4, 5]);// bailecito al acabar el nivel


		this.hayGancho = false;

		
		this.hit = false;
	}

	preload(){
		super.preload();
		this.animations.play('stopAnim', this._animSpeed, true);
	}

	create(vidas){
		super.create();
		this.numVidas = vidas; // Asigna las vidas iniciales
		console.log("player " + this.numVidas);

	}

	changeSpeedX(speedX){
		super.changeSpeed(speedX,0);
	}

	changeSpeedY(speedY){
		super.changeSpeed(0,speedY);
	}

	update(){

		if(!nivelAcabado){	

		if(this.hayGancho){
    		this.gancho.update();
    	}


			console.log(this.hit);
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
		
		   	if (this.cursors.fireButton.downDuration(0.1)){
		   		//this.animations.play('stopAnim', this._animSpeed);				///Intentar poner animacion de apuntando hacia arriba cuando dispara
		   		this.gancho.create();
		   		this.hayGancho = true;
		   	}

		   	game.physics.arcade.overlap(this, bubbles, this.lessLife, null, this);
		}
    	
    	
	}

	killGancho(){
		this.gancho.die();
		this.hayGancho = false;
	}

	lessLife(){
		if(this.numVidas>0 && !this.hit){
			this.numVidas--;
			this.hit = true;
		}
		console.log('player: ' + this.numVidas);
	}

	//para que "baile" al acabar el nivel
	dance(){
		this.animations.play('finAnim', this._animSpeed/2, true);
	}

	getVidas(){
		return (this.numVidas);
	}
}