class Platform extends GameObject{
	constructor(label, game){
		super(0, 0, label);

		this.body.immovable = true;
	}

	create(posX, posY){
		this.x = posX;
		this.y = posY;
		super.create();
	}

	update(){

	}

}