//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var go;

function preload(){
	go = new GameObject(200,200, 'images/ball.png');
	go.preload();

}

function create() {
	go.create();
	console.log('cargado go completo');
}

function update(){

}

function render() {
	
}





