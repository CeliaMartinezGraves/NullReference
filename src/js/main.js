//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });


var go, go2, ball, ball2, ball3, ball4, grvball, grvball2, grvball3, grvball4, fall, player, gancho, cursors;

function preload(){

	cursors = game.input.keyboard.createCursorKeys();
	cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'fire': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D});
	fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	go = new GameObject(200,200, 'images/platform.png','platform');
	go2 = new Platform(300,300, 'images/platform.png', 'platform');

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

	

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.gravity.y = 200;

	go.create();
	go2.create();

	balls = game.add.group();
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

	console.log('cargado go completo');
	go.resize(1, 0.5);
	go2.resize(1, 0.5);	 


	//line1 = new Phaser.Line(200, 200, 100, 100);
	//y=600;
	//x = player.posX;

	alert('las azules son sin gravedad y las rojas, con gravedad');
	
}

function update(){
	this.game.physics.arcade.collide(ball, go2);
	player.update();

	if(checkOverlap(player.gancho,ball))
		collisionHandler(player.gancho,ball);
	if(checkOverlap(player.gancho,ball2))
		collisionHandler(player.gancho,ball2);
	if(checkOverlap(player.gancho,ball3))
		collisionHandler(player.gancho,ball3);
	if(checkOverlap(player.gancho,ball4))
		collisionHandler(player.gancho,ball4);
	if(checkOverlap(player.gancho,grvball))
		collisionHandler(player.gancho,grvball);
	if(checkOverlap(player.gancho,grvball2))
		collisionHandler(player.gancho,grvball2);
	if(checkOverlap(player.gancho,grvball3))
		collisionHandler(player.gancho,grvball3);
	if(checkOverlap(player.gancho,grvball4))
		collisionHandler(player.gancho,grvball4);
	//y = y -1;
	//line1.setTo(400, 600, x,y);
	
}

function render() {
	player.render();
	//game.debug.geom(line1,'#0fffff');
}

function collisionHandler(gancho,pelota){
	
	console.log('ouchie');
	pelota.obj.kill();

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.obj.getBounds();
    var boundsB = spriteB.obj.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}




