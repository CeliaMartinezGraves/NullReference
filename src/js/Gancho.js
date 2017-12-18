class Gancho extends VerticalMovable{

	constructor(numBullets, image, label, player){

		super(player.posX, player.posY-50, image, label, -70);
		

		this.player = player;

		this.numBullets = numBullets;
		this.numBulletsRest = numBullets;
		super.preload();	
		var line1;
		var x,y;
		
	}

	create(){
		super.create();
		this.changeSpeed(0,-100);
		this.line1 = new Phaser.Line(200, 200, 100, 100);
		this.x = this.player.obj.body.x;
		this.y = this.player.obj.body.y;
		this.moveTo(this.x,this.y);
		this.obj.body.collideWorldBounds = false;
		this.obj.checkWorldBounds = true;
		this.obj.outOfBoundsKill = true;
	}

	onKilled(){
		this.numBulletsRest++;
		console.log('gancho Kill');
	}

	fire(){
		if (this.numBulletsRest > 0){
				this.create();
				this.numBulletsRest--;
		}
		console.log(this.numBulletsRest);
	}


	update(){
		if (this.obj.inWorld === false && this.numBulletsRest < this.numBullets)
			this.onKill();

		this.line1.setTo(this.x+9,this.y, this.obj.body.x+9,this.obj.body.y+5);

	}

	render(){
		game.debug.geom(this.line1,'#6E6E6E');
	}

}