/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/akDNOqwc
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    
    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'anonymous';
    
    game.load.image('player', 'images/dude.png');
    game.load.image('flyer', 'images/ball.png');
    //game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);
    game.load.image('platform', 'images/platform.png');
}


//var image;
var player;
var jumpTimer = 0;
var cursors;
var jumpButton;

function create() {
  
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    ball = game.add.sprite(400, 500, 'flyer');
    ball.scale.setTo(0.15,0.15);
    //knocker = game.add.sprite(400, 500, 'dude');

    game.physics.enable(ball, Phaser.Physics.ARCADE);
    //knocker.body.immovable = true;
    
    //  This gets it moving
    ball.body.velocity.setTo(75, 200);
    
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.set(1);

    ball.body.gravity.set(0, 201);
    
    
    player = game.add.sprite(100, 200, 'player');
    player.scale.setTo(0.15,0.15);

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    
    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(200, 300, 'platform');
    platforms.create(400, 450, 'platform');
    platforms.scale.setTo(0.5,0.5);

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
 
function update () {

    //game.physics.arcade.collide(knocker, ball);
    //game.physics.arcade.collide(knocker, player);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(ball, platforms);
    
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
    

    
}

function render () {

    //game.debug.spriteInfo(ball, 32, 32);

}