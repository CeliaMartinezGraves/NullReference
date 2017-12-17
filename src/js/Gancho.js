class Gancho extends GameObject{
	constructor(numBullets, image, label){
		super(1,1,image, label);
		this.numBullets = numBullets;		
	}


	fire(){
		//this.carga();
		
		this.weapon.fire(player);
		super.create();
	}

	carga(){
		//super.preload();
		this.weapon = game.add.weapon(this.numBullets, this.label);

		this.weapon.bulletAngleOffset = 90;
		this.weapon.bulletSpeed = 400;
		this.weapon.trackSprite(player, 10, 400);
	}



}