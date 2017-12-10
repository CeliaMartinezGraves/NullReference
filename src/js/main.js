//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var go, go2;

function preload(){
	go = new GameObject(200,200, 'images/ball.png');
	go2 = new GameObject(300,300, 'images/ball.png');
	go.setLabel('ball');
	go2.setLabel('ball');
	go.preload();

}

function create() {
	go.create();
	go2.create();
	console.log('cargado go completo');
	go.resize(0.15,0.15);
	go2.resize(0.20, 0.20);
}

function update(){

}

function render() {
	
}





