//'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });


var go, go2, ball, ball2, ball3, ball4, grvball, grvball2, grvball3, grvball4, fall, player, player2, gancho, cursors;
var bubbles;
var boundsA, boundsB;
var i;


function preload(){

	cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.L});
	cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});

	go = new GameObject(200,200, 'images/platform.png','platform');
	go2 = new Platform(300,300, 'images/platform.png', 'platform');

	
	bubbles = [
		ball = new Bubble(300, 100, 'images/pokemonicon.png', 'ball', -100, 150, 1, bubbles),
		ball2 = new Bubble(400, 100, 'images/pokemonicon.png', 'ball', -100, 150, 2, bubbles),
		ball3 = new Bubble(500, 100, 'images/pokemonicon.png', 'ball', -100, 150, 3, bubbles),
		ball4 = new Bubble(600, 100, 'images/pokemonicon.png', 'ball', -100, 150, 4, bubbles),

		grvball = new GravityBubble(200, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 1, bubbles),
		grvball2 = new GravityBubble(350, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 2, bubbles),
		grvball3 = new GravityBubble(450, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 3, bubbles),
		grvball4 = new GravityBubble(550, 100, 'images/pokemoniconred.png', 'gball', 100, 150, 4, bubbles)
	];

	go.preload();
	ball.preload();
	grvball.preload();

	fall = new VerticalMovable(500, 100, 'images/phaser.png', 'fall', 50);
	fall.preload();

	player = new Player('images/dude.png','dude', 0, 0, cursorsWASD);
	player.preload();

	player2 = new Player('images/dude2.png','dude2', 0, 0, cursors);
	player2.preload();

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.gravity.y = 200;

	go.create();
	go2.create();

	balls = game.add.group();

	for(i = 0; i < bubbles.length; i++){
		bubbles[i].create();
	}

	fall.create();
	fall.resize(0.1,0.1);

	player.create();
	player2.create();

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
	player2.update();

	console.debug(player2.hayGancho)

	for(i = 0; i < bubbles.length; i++){
		if(player.hayGancho){
			
			if(checkOverlap(player.gancho, bubbles[i])){
				collisionHandler(player, bubbles[i], i);
			}
		}
		if(player2.hayGancho){

			if (checkOverlap(player2.gancho, bubbles[i])){
				collisionHandler(player2, bubbles[i], i);
			}	
		}
	}	
}


function render() {
	player.render();
	player2.render();
	//game.debug.geom(line1,'#0fffff');
}

function collisionHandler(jugador,pelota, indice){
	
	console.log('ouchie');
	pelota.die(bubbles);

	bubbles.splice(indice, 1);
	
	//jugador.gancho.die();
	jugador.killGancho();

}

function checkOverlap(spriteA, spriteB) {

	if (spriteA.exists && spriteB.exists){
    	boundsA = spriteA.obj.getBounds();
    	boundsB = spriteB.obj.getBounds();

	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	}
	else
		return false;
}




