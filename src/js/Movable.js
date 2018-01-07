class Movable extends GameObject {
	constructor(posX, posY, label, speedX, speedY){
		super(posX, posY, label);
		this.speedX = speedX;
		this.speedY = speedY;
	}

	create(){
		super.create();
		game.physics.arcade.enable(this.obj);

		this.obj.body.velocity.setTo(this.speedX, this.speedY);

	}

	changeSpeed(speedX, speedY){
		this.speedX = speedX;
		this.speedY = speedY;
		this.obj.body.velocity.x = this.speedX;
		this.obj.body.velocity.y = this.speedY;
	}

	update(){
		
	}

	moveTo(x,y){
		this.obj.x = x;
		this.obj.y = y;

	}

}


//this.obj.body.bounce.y = 1.001; para los rebotes en y 
// ESTO NO VA EN ESTA CLASE; ES POR DEBUG 
    //this.obj.body.bounce.y = 1.001; 
    //this.obj.body.bounce.x = 1.001; 
//this.obj.body.collideWorldBounds = true; esto en todo menos animales 

// Añade la funcionalidad de chocar con los bordes del mundo,
// ya que los enemigos no lo tienen, para que de aqui hereden 
// player, caidos y burbuja que si lo necesitan
class collideWorld extends Movable{
	constructor(posX, posY, label, speedX, speedY){
		super(posX, posY, label, speedX, speedY);
	}

	create(){
		super.create();
		this.obj.body.collideWorldBounds = true;
	}
}