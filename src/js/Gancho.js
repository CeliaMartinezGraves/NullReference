class Gancho extends VerticalMovable{

	constructor(numBullets, image, label, player){

		super(player.posX, player.posY, image, label, -70);
		
		this.player = player;

		this.numBullets = numBullets;
		super.preload();	
	}

	

	fire(){
		super.create();
		this.weapon.fire(this.player);
		
	}

	carga(){
		//super.preload();
		this.weapon = game.add.weapon(this.numBullets, this.label);

		this.weapon.bulletAngleOffset = 90;
		this.weapon.bulletSpeed = 400;
		this.weapon.trackSprite(this.player, 10, 400);
	}

}