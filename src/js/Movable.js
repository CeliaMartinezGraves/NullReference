class Movable extends GameObject {
	constructor(posX, posY, label, speedX, speedY){
		super(posX, posY, label);
		this.body.velocity.setTo(speedX, speedY); // añade la velocidad
	}

	// Cambiar la velocidad del objeto
	changeSpeed(speedX, speedY){
		this.body.velocity.x = speedX;
		this.body.velocity.y = speedY;
	}
}

// Añade la funcionalidad de chocar con los bordes del mundo,
// ya que los enemigos no lo tienen, para que de aqui hereden 
// player, caidos y burbuja, que si lo necesitan
class collideWorld extends Movable{

	create(){
		super.create();
		this.body.collideWorldBounds = true;
	}
}

// solo se mueve hacia abajo hasta colisionar con el suelo
// añadir para que pare tambien al chocar con plataformas
class VerticalMovable extends collideWorld{
	constructor(posX, posY, label, speedY){
		super(posX, posY, label, 0, speedY);
	}

	update(){
		//game.physics.arcade.collide(platforms, this);
	}
}



class PowerUp extends VerticalMovable{

	constructor (posX, posY, label,speedY){
		super(posX, posY, label, speedY);
	}

}

class Vida extends PowerUp{
	constructor (posX, posY, label,speedY){
		super(posX, posY, label, speedY);
		this.addAnim('changing', [0,1]);
	}

	create(vidas){
		super.create();
		this.animations.play('changing', this._animSpeed-10,true);

	}

	powers(player){
		if(player.getVidas() < 3){
			player.numVidas += 1;
			this.destroy();
		}
	}
}

class DobleGancho extends PowerUp{
	constructor (posX, posY, label,speedY){
		super(posX, posY, label, speedY);
		this.addAnim('changing', [0,1]);
	}

	create(vidas){
		super.create();
		this.animations.play('changing', this._animSpeed-10,true);

	}

	powers(player){
		if(player.hayGancho.length == 1){
			player.hayGancho.push (false);
			player.ganchos.push (new Gancho('hook',player,1));
			this.destroy();
		}
	}
}