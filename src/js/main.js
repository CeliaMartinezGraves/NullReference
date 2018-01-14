'use strict';


var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });

var go, go2, player, cursors, cursorsWASD, fall;
var bubbles, platforms, players, secondPly; // grupos con las burbujas, plataformas y jugadores
var boundsA, boundsB;
var i;
var currentLevel = 0;// nivel de juego

function preload(){
	bubbles = [];
	platforms = [];
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.state.add('Preload', new Preload(), false); // Añade el estado preload al game
	game.state.add('GameTitle', new GameTitle(), false);
	game.state.add('LoadLevel', new LoadLevel(), false); // lectura de nivel
	game.state.add('Main', new Main(), false); // bucle principal del juego
	game.state.add('Credits', new Credits(), false);

	game.state.start('Preload'); // hace que el game se inicie desde aqui y lance el Preload
}

function create() {
		
}


function update(){

}

function render(){

}
