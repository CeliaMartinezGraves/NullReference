//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });

var go, go2, ball;

function preload(){

	go = new GameObject(200,200, 'images/platform.png');
	go2 = new GameObject(300,300, 'images/platform.png');
	go.setLabel('platform');
	go2.setLabel('platform');
	go.preload();

	ball = new Movable(300, 100, 'images/ball.png', 50, 50);
	ball.setLabel('ball');
	ball.preload();

}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 200;
		
	go.create();
	go2.create();
	ball.create();
	

	console.log('cargado go completo');
	go.resize(1, 0.5);
	go2.resize(1, 0.5);
	ball.resize(0.2, 0.2);
	
}

function update(){

}

function render() {
	
}





