//'use strict';

var bublleSmall = 0.10;

var Player = {
	vidas = 3;

};
var Bubble = {
	nivel;

	constructor (lvl, posX, posY, image){
		nivel = lvl;
		game.load.image('ballImage', image);
		game.add.sprite(posY, posY, 'ballImage');
		this.scale.setTo(bublleSmall * nivel, bublleSmall*nivel);
	}
};