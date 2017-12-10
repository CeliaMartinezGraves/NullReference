
class GameObject {

	constructor (posX, posY, image){
		this.posX = posX;
		this.posY = posY;
		this.image = image;
		console.log(image);
		game.load.image('flyer', image);
		console.log('carga imagen');

	}

	preload(){
		
	}

	create(){
		var ball = game.add.sprite(this.posX, this.posY, 'flyer');
		console.log('colocado go');
	}
}

class Movable extends GameObject {
	constructor(posX, posY, image, speedX, speedY){
		super(posX, posY, image);
	}
}















var Bubble = {
	nivel : 8,
	
	constructor (lvl, posX, posY, image){
		var nivel = lvl;
		var imagen = image;
	},

	constructor(){},

	preload: function () {
		game.load.image('ballImage', imagen);
		this.scale.setTo(bublleSmall * nivel, bublleSmall*nivel);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.setTo(75, 200);
		this.body.collideWorldBounds = true;

		this.body.bounce.set(1);

   		this.body.gravity.set(0, 201);
	},

	render: function(){
			game.add.sprite(posY, posY, 'ballImage');
	}
};