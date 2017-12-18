class Bubble extends collideWorld{
	constructor(posX, posY, image, label,speedX, speedY, level, arrayParent){
		super(posX, posY, image, label, speedX, speedY);
		this.level = level;
		this.width = 0.8;
		this.heigth = 0.8;
		this.arrayParent = arrayParent;
	}

	create(){
		super.create();
		this.resize(this.width*this.level, this.heigth*this.level);
		this.obj.body.bounce.y = 1.001;
		this.obj.body.bounce.x = 1.001;
	}

	divide(parent){
		var ballSon1 = new Bubble(this.posX, this.posY, 'images/pokemonicon.png', 'ball', -100, 150, this.level-1, this.arrayParent);
		ballSon1.create();
		var ballSon2 = new Bubble(this.posX, this.posY, 'images/pokemonicon.png', 'ball', 100, 150, this.level-1, this.arrayParent);
		ballSon2.create();

		parent.push(ballSon1);
		parent.push(ballSon2);
	}

	onKilled(parent){
		if (this.level > 0)
			this.divide(parent);
		this.obj.destroy();
		console.log('bubble kill');
	}

	getLevel(){
		return this.level;
	}
}

class GravityBubble extends Bubble{
	create(){
		super.create();
		this.obj.body.gravity.y = 250;
		this.changeSpeed(this.speedX, 0);
	}
}