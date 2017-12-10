class Bubble extends collideWorld{
	constructor(posX, posY, image, label,speedX, speedY){
		super(posX, posY, image, label, speedX, speedY);
	}

	create(){
		super.create();
		this.obj.body.bounce.y = 1.001;
		this.obj.body.bounce.x = 1.001;
	}
}