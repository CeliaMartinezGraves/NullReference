class Player extends collideWorld{
	constructor(label, speedX, speedY, cursors, playerID){ // PLAYERID ES SI ES PLYR 1, 2, etc
		super(game.width/2, game.height-75, label, speedX, speedY);
		
		var posXGUI;

		this.body.setSize(75, 74, 0);// Hace un poco mas pequeño el collider

		if(playerID === 1){
			this.moveTo((game.width/2)-this.width/4, this.y);
			posXGUI = 20;
		}else{
			posXGUI =700;
		}
		this.cursors = cursors;
		this.gancho = new Gancho('hook', this);

		// añade los frames de cada animacion
		this.addAnim('leftAnim', [4, 5, 6, 7]);
		this.addAnim('rightAnim', [0, 1, 2, 3]);
		this.addAnim('stopAnim', [8]);
		this.addAnim('dieAnim', [8, 10]);
		this.addAnim('finAnim', [0, 1, 0, 1, 4, 5, 4, 5]);// bailecito al acabar el nivel

		this.controlable = true;
		this.hayGancho = false;
		this.hit = false;
		
		this.GUI = [new GUI(posXGUI, 15, this.label, null), new GUI(posXGUI, 15, this.label, null), new GUI(posXGUI, 15, this.label, null)];
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

		if(!nivelAcabado && this.controlable){	

			if(this.hayGancho){
    			this.gancho.update();
    		}

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
		
		   	if (this.cursors.fireButton.downDuration(0.1) & !this.hayGancho){
		   		this.changeSpeedX(0);
		   		this.animations.play('stopAnim', this._animSpeed);				
		   		this.gancho.create();
		   		this.hayGancho = true;
		   	}
  	
		}
    	
    	
	}

	killGancho(){
		this.gancho.die();
		this.hayGancho = false;
	}

	lessLife(){
		if(this.numVidas>0 && !this.hit){
			this.game.sound.stopAll();
			daño.play();

			this.numVidas--;
			this.hit = true;
			this.animations.play('dieAnim', this._animSpeed/2, true);
			this.changeSpeedX(0);
			this.controlable = false;
			return true;
		}else
			return false;
		console.log('player: ' + this.numVidas);
	}

	//para que "baile" al acabar el nivel
	dance(){
		this.controlable = false;
		this.changeSpeedX(0);
		this.animations.play('finAnim', this._animSpeed/2, true);
	}

	getVidas(){
		return (this.numVidas);
	}
}