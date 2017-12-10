class Bubble extends collideWorld{
	constructor(posX, posY, image, label,speedX, speedY, level){
		super(posX, posY, image, label, speedX, speedY);
		this.level = level;
		this.width = 0.8;
		this.heigth = 0.8;
	}

	create(){
		super.create();
		this.resize(this.width*this.level, this.heigth*this.level);
		this.obj.body.bounce.y = 1.001;
		this.obj.body.bounce.x = 1.001;
	}
}

class GravityBubble extends Bubble{
	create(){
		super.create();
		this.obj.body.gravity.y = 250;
		this.changeSpeed(this.speedX, 0);
	}
}