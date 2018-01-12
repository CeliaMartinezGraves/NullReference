class Gancho extends VerticalMovable{

	constructor(numBullets, label, player){

		super(player.posX, player.posY-50, label, -200);
		

		this.player = player;

		this.numBullets = numBullets;
		this.numBulletsRest = numBullets;
		super.preload();	
		var rect;
		var rectWidth;
		var x,y;
		
	}

	create(){
		super.create();
		this.rect = new Phaser.Rectangle(200,200,100,100);
		//this.line1 = new Phaser.Line(200, 200, 100, 100);
		this.x = this.player.obj.body.x;
		this.y = this.player.obj.body.y;
		this.moveTo(this.x,this.y);
		this.obj.body.collideWorldBounds = false;
		this.obj.checkWorldBounds = true;
		this.obj.outOfBoundsKill = true;
		this.rectWidth=3;
	}

	die(){
		//this.numBulletsRest++;
		this.rect.setTo(-100,-100,100,100);
		this.render();
		this.obj.destroy();
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
			this.die();

		if (this.obj.alive){
			this.rect.setTo(this.obj.body.x+8, this.obj.body.y, this.rectWidth, this.y - this.obj.body.y );
		}
			//this.line1.setTo(this.x+9,this.y, this.obj.body.x+9,this.obj.body.y+5);

	}

	render(){
		game.debug.geom(this.rect,'#6E6E6E');
	}

}