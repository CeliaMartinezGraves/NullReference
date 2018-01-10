class Platform extends GameObject{
	constructor(label, game){
		super(0, 0, label);

		this.game = game;

		console.log(Object.keys(this.obj));
	}

	create(posX, posY){
		
		this.obj = this.game.add.physicsGroup();
		
		this.posX = posX;
		this.posY = posY;
		this.obj.create(this.posX, this.posY, this.label);
		
		console.log(Object.keys(this.obj));
		console.log(this.obj.body);
	}

}