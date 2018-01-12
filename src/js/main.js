'use strict';


var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });

var go, go2, player, cursors, fall;
var bubbles, platforms;
var boundsA, boundsB;
var i;

function preload(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.state.add('Preload', new Preload(), false); // Añade el estado preload al game
	game.state.add('GameTitle', new GameTitle(), false);
	game.state.add('LoadLevel', new LoadLevel(), false); // lectura de nivel
	game.state.add('Main', new Main(), false);

	game.state.start('Preload'); // hace que el game se inicie desde aqui y lance el Preload
}

function create() {
		
}


function update(){

}

function render(){

}
