//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });


var go, go2, ball, ball2, ball3, ball4, grvball, grvball2, grvball3, grvball4, fall, player, p2, cursors;

function preload(){

	cursors = game.input.keyboard.createCursorKeys();
	cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'fire': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D});

	go = new GameObject(200,200, 'images/platform.png','platform');
	go2 = new GameObject(300,300, 'images/platform.png', 'platform');

	go.preload();

	ball = new Bubble(300, 100, 'images/pokemonicon.png', 'ball', -100, 150, 1);
	ball.preload();

	ball2 = new Bubble(400, 100, 'images/pokemonicon.png', 'ball', -100, 150, 2);

	ball3 = new Bubble(500, 100, 'images/pokemonicon.png', 'ball', -100, 150, 3);

	ball4 = new Bubble(600, 100, 'images/pokemonicon.png', 'ball', -100, 150, 4);

	grvball = new GravityBubble(200, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 1);
	grvball.preload();
	grvball2 = new GravityBubble(350, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 2);
	grvball3 = new GravityBubble(450, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 3);
	grvball4 = new GravityBubble(550, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 4);

	fall = new VerticalMovable(500, 100, 'images/phaser.png', 'fall', 50);
	fall.preload();

	player = new Player('images/dude.png','dude', 0, 0, cursorsWASD);
	player.preload();

	//p2 = new Player('images/dude.png','dude', 0, 0, cursors);
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.gravity.y = 200;

	go.create();
	go2.create();

	ball.create();
	ball2.create();
	ball3.create();
	ball4.create();

	grvball.create();
	grvball2.create();
	grvball3.create();
	grvball4.create();

	fall.create();
	fall.resize(0.1,0.1);

	player.create();
	p2.create();

	console.log('cargado go completo');
	go.resize(1, 0.5);
	go2.resize(1, 0.5);	 

	alert('las azules son sin gravedad y las rojas, con gravedad');
	
}

function update(){
	player.update();
	//p2.update();
}

function render() {
	
}





