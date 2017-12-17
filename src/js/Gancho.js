class Gancho extends VerticalMovable{

	constructor(numBullets, image, label, player){

		super(player.posX, player.posY-50, image, label, -70);
		

		this.player = player;

		this.numBullets = numBullets;
		super.preload();	
	}

	create(){
		super.create();
		this.changeSpeed(0,-70);
	}
	

	fire(){
		this.create();		
	}

	carga(){


		this.weapon = game.add.weapon(this.numBullets, this.label);

		this.weapon.bulletAngleOffset = 90;
		this.weapon.bulletSpeed = 400;
		this.weapon.trackSprite(this.player, 10, 400);
	}

}