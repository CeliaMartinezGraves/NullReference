class Gancho extends VerticalMovable{

	constructor(numBullets, label, player){

		super(player.posX, player.posY-50, label, -200);
		

		this.player = player;

		this.numBullets = numBullets;
		this.numBulletsRest = numBullets;	
		var rect;
		var rectWidth;
		var x,y;
		
	}

	create(){
		super.create();
		this.rect = new Phaser.Rectangle(200,200,100,100);
		this.x = this.player.body.x;
		this.y = this.player.body.y;
		this.moveTo(this.x,this.y);
		this.body.collideWorldBounds = false;
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.rectWidth=3;
	}

	die(){
		this.rect.setTo(-100,-100,100,100);
		this.render();
		this.destroy();
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
		if (this.inWorld === false && this.numBulletsRest < this.numBullets)
			this.die();

		if (this.alive){
			this.rect.setTo(this.body.x+8, this.body.y, this.rectWidth, this.y - this.body.y );
			console.log(this.rect.height);
		}

	}

	render(){
		game.debug.geom(this.rect,'#6E6E6E');
	}

}