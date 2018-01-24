// burbuja básica sin gravedad
class Bubble extends collideWorld{
	constructor(posX, posY, label,speedX, speedY, level){
		super(posX, posY, label, speedX, speedY);
		this.level = level;
		this.width = 0.8;
		this.heigth = 0.8;
		this.tipo = Bubble; // Para luego generar los hijos
	}

	create(posInGroup){
		super.create();
		this.posInGroup = posInGroup; // guarda su pos en el array de bubbles 
		// que el tamaño dependa del nivel
		this.resize(this.width*this.level, this.heigth*this.level); 
		this.body.bounce.setTo(1, 1); // que los rebotes no pierdan energia
	}

	// Divide en dos burbujas del mismo, de un nivel menor y las mete en el array del padre
	divide(father){	
		var ballSon1 = new this.tipo(this.body.x, this.body.y, this.label, -100, 150, this.level-1);
		ballSon1.create(this.posInGroup); // porque se añaden en el final del array 
		var ballSon2 = new this.tipo(this.body.x, this.body.y, this.label, 100, 150, this.level-1);
		ballSon2.create(father.length); // porque se añaden en el final del array 

		father.splice(this.posInGroup, 1, ballSon1); // Para añadirlo en la pos del padre
		father.push(ballSon2); // Añadirla al final del array
	}

	// muerte y division de la burbuja (si se puede)
	die(parent){

		if (this.level > 1)
			this.divide(parent);
		else{
			parent.splice(this.posInGroup, 1);
			for(i = 0; i < parent.length; i++)
				parent[i].changePosInGroup(i); 
		}// porque cuando se muere una pequeña, deja huco pero no se actualiza la posInGroup de las demas

		
		this.destroy();

		console.log('bubble kill');
	}

	getLevel(){
		return this.level;
	}

	changePosInGroup(pos){
		this.posInGroup = pos; // Para actualizar las pos cuando se destruyen burbujas
	}
}

// Añade las burbujas con gravedad
class GravityBubble extends Bubble{
	create(posInGroup){
		super.create(posInGroup);
		this.tipo = GravityBubble;
		this.setGravity(200);
		//this.body.bounce.setTo(1, 1.0015); // que los rebotes no pierdan energia
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