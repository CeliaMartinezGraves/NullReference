class Movable extends GameObject {
	constructor(posX, posY, image, label, speedX, speedY){
		super(posX, posY, image, label);
		this.speedX = speedX;
		this.speedY = speedY;
	}

	create(){
		super.create();
		game.physics.arcade.enable(this.obj);

		this.obj.body.velocity.setTo(this.speedX, this.speedY);

		// ESTO NO VA EN ESTA CLASE; ES POR DEBUG
		this.obj.body.collideWorldBounds = true;
		this.obj.body.bounce.y = 1.001;
		this.obj.body.bounce.x = 1.001;
	}

	changeSpeed(speedX, speedY){
		this.speedX = speedX;
		this.speedY = speedY;
	}

	update(){
		game.physics.arcade.collide(this.obj, 'platforms');
	}

}


//this.obj.body.bounce.y = 1.001; para los rebotes en y

//this.obj.body.collideWorldBounds = true; esto en todo menos animales
