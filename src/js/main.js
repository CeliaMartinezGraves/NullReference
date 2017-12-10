//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });

var go, go2, ball, fall;

function preload(){

	go = new GameObject(200,200, 'images/platform.png','platform');
	go2 = new GameObject(300,300, 'images/platform.png', 'platform');

	go.preload();

	ball = new Bubble(300, 100, 'images/ball.png', 'ball', -100, 150);
	ball.preload();

	fall = new VerticalMovable(500, 100, 'images/phaser.png', 'fall', 50);
	fall.preload();

}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.gravity.y = 200;

	go.create();
	go2.create();
	ball.create();
	fall.create();
	fall.resize(0.1,0.1);

	console.log('cargado go completo');
	go.resize(1, 0.5);
	go2.resize(1, 0.5);
	ball.resize(0.2, 0.2);
	
}

function update(){
	ball.update();
}

function render() {
	
}





