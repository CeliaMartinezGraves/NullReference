class Platform extends GameObject{
	constructor(posX, posY, label, rotar){
		super(posX, posY, label);
		this.body.immovable = true; // añade la propiedad inmóvil
		this.addAnim('construccion',[1]);
		this.addAnim('normal',[0]);
		this.normal = true;

		if(rotar === 1){
			this.angle = 90;
			this.body.setSize(17, 100, -17);
		}
		
	}

	platDeLaConstruccion(){
		if(this.normal){
			this.animations.play('construccion',0);
			this.normal = false;
		}
		else{
			this.animations.play('normal',0);
			this.normal = true;
		}

	}
	
}

class BreakablePlatform extends Platform{
	constructor(posX, posY, label, rotar){
		super(posX, posY, label,rotar);
		this.rompible = true;
	}

	break(){
		this.rand = Math.trunc(Math.random()*4 + 1);
		//if(this.rand == 1 || this.rand == 2){
			console.log("powerup!");
			if(powerups == null)
				powerups = [];

			powerups.push(new Vida(this.x,this.y, 'vida', 100));
			powerups[powerups.length-1].create();
			
		//}
		this.destroy();

	}

}