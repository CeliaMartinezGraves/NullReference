class Bubble extends collideWorld{
	constructor(posX, posY, label,speedX, speedY, level){
		super(posX, posY, label, speedX, speedY);
		this.level = level;
		this.width = 0.8;
		this.heigth = 0.8;
		this.tipo = Bubble;
		game.physics.arcade.enable(this);

	}

	create(){
		super.create();
		bubbles.addChild(this);
		this.resize(this.width*this.level, this.heigth*this.level);
		this.obj.body.bounce.y = 1.001;
		this.obj.body.bounce.x = 1.001;
	}

	divide(father){
		var ballSon1 = new this.tipo(this.obj.body.x, this.obj.body.y, 'images/pokemonicon.png', this.label, -100, 150, this.level-1);
		ballSon1.create();
		var ballSon2 = new this.tipo(this.obj.body.x, this.obj.body.y, 'images/pokemonicon.png', this.label, 100, 150, this.level-1);
		ballSon2.create();

		father.push(ballSon1);
		father.push(ballSon2);
	}

	die(parent){
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
		this.tipo = GravityBubble;
		this.obj.body.gravity.y = 250;
		this.changeSpeed(this.speedX, 0);
	}
}