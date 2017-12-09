//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

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

function create() {
	if (typeof burbuja !== 'undefined'){
		
	}
}

function update(){

}

function render() {
	//game.debug.spriteInfo(burbuja, 32, 32);
}


