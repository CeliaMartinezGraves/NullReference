//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var burbuja;

function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
   // document.querySelector("head").appendChild(s);
}

function scriptCargado(){
	Console.log("33");
	burbuja = new Bubble(3, 400, 500, 'images/ball.png');
	burbuja.preload();

}



function preload(){

	var objects = importarScript("./objects.js", scriptCargado);
}

function create() {
	if (typeof burbuja !== 'undefined'){
		burbuja.render(); 
	}
}

function update(){

}

function render() {

}


