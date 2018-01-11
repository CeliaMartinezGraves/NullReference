class Platform extends GameObject{
	constructor(posX, posY, label){
		super(posX, posY, label);
		this.body.immovable = true; // añade la propiedad inmóvil
	}
}