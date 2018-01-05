class Gancho extends Phaser.Weapon {

	constructor(numBullets, image, label, player){
		super(game, player);
		
		this.numBullets = numBullets;
		this.image = image;
		this.label = label;
		this.player = player;
		
		
	}

	cargaIMG(){
		game.load.image(this.label, this.image);
	}

	changeSpeed(speed){
		this.bulletSpeed = speed;
	}

	preload(){
		this.cargaIMG();
		this.createBullets(this.numBullets, this.label);
	}

	create(){
		console.log(Object.keys(this));
		this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.bulletAngleOffset = 180;
		this.bulletSpeed = 400;
		this.trackSprite(this.player, 0, 0);
	}

	fire(){
		super.fire();

		console.log(this.bulletKey);

		//game.add.sprite(this.player.obj.body.x, this.player.obj.body.y, this.label);
	}

}