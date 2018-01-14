class Gancho extends VerticalMovable{

	constructor(numBullets, label, player){

		super(player.x, player.y-50, label, -200);
		
		this.player = player;

		this.numBullets = numBullets;
		this.numBulletsRest = numBullets;		
	}

	create(){
		console.log("creo");

		super.revive();
		super.create();
		this.rect = new Phaser.Rectangle(0,0,0,0);
		this.Xply = this.player.body.x+50;
		this.Yply = this.player.body.y;

		this.moveTo(this.Xply,this.Yply);
		this.body.collideWorldBounds = false;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
		this.rectWidth=3;
	}

	die(){
		this.rect.setTo(0,0,0,0);
		this.render();
		this.kill();
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
		/*if (this.inWorld === false && this.numBulletsRest < this.numBullets)
			this.die();*/

		if (this.alive){
			this.aux = this.Yply - this.body.y ;

			this.rect.setTo(this.body.x+8, this.body.y, this.rectWidth, this.aux);
			//console.log(this.rect.height);
			//console.log(this.y);
			//console.log(this.Yply);
			//console.log(this.body.y);
			//console.log(this.body.x);
		}

	}

	render(){
		if(this.alive){
			game.debug.geom(this.rect,'#6E6E6E');
		}
	}

}