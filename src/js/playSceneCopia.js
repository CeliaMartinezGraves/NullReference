'use strict';

var Objects = {
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
};

module.exports = Objects;

// MAIN ANTERIOR QUE NO FUNCIONA
var burbuja;

function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    return s;
    document.querySelector("head").appendChild(s);

}

function scriptCargado(){
	
}


function preload(){

	var objects = importarScript("./js/objects.js");

	console.log('33');
	if (objects === undefined)
		{console.log('objetos de M');}
	else if (objects.Bubble === undefined)
		{
			console.log(Object.keys(objects));
			console.log(typeof objects);
			console.log('Bubble');}
	else {
		burbuja = objects.Bubble.constructor(3, 400, 500, 'images/ball.png');
		burbuja.preload();
		burbuja.render();
		console.log('sacabo');
	}
	
}