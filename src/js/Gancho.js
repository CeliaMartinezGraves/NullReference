class Gancho extends VerticalMovable{

	constructor(label, player){

		super(-100, -100, label, -200);
		
		this.player = player;
		this.alive = false;
	}

	create(){
		console.log("creo");
		//this.alive = true;
		super.revive();
		super.create();
		this.rect = new Phaser.Rectangle(0,0,0,0);
		this.Xply = this.player.body.x+40;
		this.Yply = this.player.body.y+5;

		this.moveTo(this.Xply,this.Yply);
		this.body.collideWorldBounds = false;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
		this.rectWidth=3;
	}

	die(){
		this.player.hayGancho = false;
		this.rect.setTo(0,0,0,0);
		this.alive = false;
		this.render();
		this.kill();
		game.debug.geom(this.rect,'#6E6E6E');
	}


	update(){
		
		if (this.alive){
			this.aux = game.height - this.body.y ;
			this.rect.setTo(this.body.x+8, this.body.y, this.rectWidth, this.aux);
		}

	}

	render(){
		if(this.alive){
			game.debug.geom(this.rect,'#6E6E6E');
		}
	}

	handleCollisions(bubbles,platforms){
		if ( !this.game.physics.arcade.overlap(this, platforms, this.overlapGanchoPlataforma, null, this) &&
		!this.game.physics.arcade.overlap(this, bubbles, this.overlapGanchoBurbuja, null, this)){

			for(var i = 0; i < bubbles.length;i++){
				if(Phaser.Rectangle.intersects(this.rect, bubbles[i].getBounds())){
					this.overlapGanchoBurbuja(this,bubbles[i]);
				}
			}
			
		}

	}

	overlapGanchoBurbuja(gancho,bubble){
		console.log('overlapGanchoBurbuja');

		gancho.die();
		bubble.die(bubbles);
		explosion.play();

	}

	overlapGanchoPlataforma(gancho,platform){
		console.log('overlapGanchoPlataforma');
		gancho.die();

	}

}