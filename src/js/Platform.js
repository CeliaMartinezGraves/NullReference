class Platform extends GameObject{
	constructor(posX, posY, label, rotar){
		super(posX, posY, label);
		this.body.immovable = true; // añade la propiedad inmóvil
		this.addAnim('construccion',[1]);
		this.addAnim('normal',[0]);
		this.normal = true;
		if(rotar === 1){
			this.angle = 90;
		}
	}

	platDeLaConstruccion(){
		if(this.normal){
			this.animations.play('construccion',0,true);
			this.normal = false;
		}
		else{
			this.animations.play('normal',1,true);
			this.normal = true;
		}

	}
}