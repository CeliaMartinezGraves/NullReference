
var bublleSmall = 0.10;

var Player = {
};
var Bubble = {
	
	constructor (lvl, posX, posY, image){
		var nivel = lvl;
		var imagen = image;
	},

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