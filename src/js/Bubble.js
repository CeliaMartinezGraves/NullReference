// burbuja básica sin gravedad
class Bubble extends collideWorld{
	constructor(posX, posY, label,speedX, speedY, level){
		super(posX, posY, label, speedX, speedY);
		this.level = level;
		this.width = 0.8;
		this.heigth = 0.8;
		this.tipo = Bubble; // Para luego generar los hijos
	}

	create(){
		super.create();
		// que el tamaño dependa del nivel
		this.resize(this.width*this.level, this.heigth*this.level); 
		this.body.bounce.setTo(1, 1); // que los rebotes no pierdan energia
	}

	// Divide en dos burbujas del mismo, de un nivel menor y las mete en el array del padre
	divide(father){	
		var ballSon1 = new this.tipo(this.body.x, this.body.y, this.label, -100, 150, this.level-1);
		ballSon1.create();
		var ballSon2 = new this.tipo(this.body.x, this.body.y, this.label, 100, 150, this.level-1);
		ballSon2.create();

		father.push(ballSon1);
		father.push(ballSon2);
	}

	// muerte y division de la burbuja (si se puede)
	die(parent){
		if (this.level > 0)
			this.divide(parent);
		this.destroy();

		console.log('bubble kill');
	}

	getLevel(){
		return this.level;
	}
}

// Añade las burbujas con gravedad
class GravityBubble extends Bubble{
	create(){
		super.create();
		this.tipo = GravityBubble;
		this.setGravity(250);
	}

	// devuelve el valor de la gravedad en Y
	getGravity(){
		return this.body.gravity.y;
	}

	// Cambia la gravedad en Y
	setGravity(gravityY){
		this.body.gravity.y = gravityY;
	}
}