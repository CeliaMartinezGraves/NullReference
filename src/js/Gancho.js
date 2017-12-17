class Gancho extends VerticalMovable{

	constructor(numBullets, image, label, player){

		super(player.posX, player.posY-50, image, label, -70);
		

		this.player = player;

		this.numBullets = numBullets;
		super.preload();	
		var line1;
		var x,y;
		
	}

	create(){
		super.create();
		this.changeSpeed(0,-80);
		this.line1 = new Phaser.Line(200, 200, 100, 100);
		this.x = this.player.obj.body.x;
		this.y = this.player.obj.body.y;
		this.moveTo(this.x,this.y);
		
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

	update(){
		this.line1.setTo(this.x+9,this.y, this.obj.body.x+9,this.obj.body.y+5)
	}

	render(){
		game.debug.geom(this.line1,'#6E6E6E');
	}

}