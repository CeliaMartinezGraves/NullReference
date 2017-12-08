//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });



function importarScript(nombre, callback) {
    var s = document.createElement("script");
    s.onload = callback;
    s.src = nombre;
    document.querySelector("head").appendChild(s);
}

function scriptCargado(){
	Console.log("33");
	var burbuja = new Bubble(3, 400, 500, 'images/ball.png');

	game.physics.enable(burbuja, Phaser.Physics.ARCADE);
	burbuja.body.velocity.setTo(75, 200);
	burbuja.body.collideWorldBounds = true;

	burbuja.body.bounce.set(1);

    burbuja.body.gravity.set(0, 201); 
}



function preload(){
	game.load.baseURL = 'https://celiamartinezgraves.github.io/NullReference/src/';

    game.load.crossOrigin = 'anonymous';
    
	var objects = importarScript("./objects.js", scriptCargado);
}

function create() {
	

}

function update(){

}

function render() {

}


