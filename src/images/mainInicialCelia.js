'use strict';

var objects = require('./objects.js');

// Deberia utilizar el game que esta en "object.js"
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)

    this.game.load.baseURL = 'https://celiamartinezgraves.github.io/NullReference/src/';

    this.game.load.crossOrigin = 'anonymous';

    
    this.game.load.image('player', 'images/dude.png');
    this.game.load.image('flyer', 'images/ball.png');
    this.game.load.image('platform', 'images/platform.png');
    this.game.load.image('bullet', 'images/hook.png');
}

var weapon;
var player;
var cursors;
var fireButton;

function create() {
    //  Creates 1 single bullet, using the 'bullet' graphic
    weapon = game.add.weapon(2, 'bullet');

     //  The bullet will be automatically killed when it leaves the world bounds
    //weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    weapon.bulletLifespan = 1700;

    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    

    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    ball = game.add.sprite(400, 500, 'flyer');
    ball.scale.setTo(0.15,0.15);
    //knocker = game.add.sprite(400, 500, 'dude');

    this.game.physics.enable(ball, Phaser.Physics.ARCADE);
    //knocker.body.immovable = true;
    
    //  This gets it moving
    ball.body.velocity.setTo(75, 200);
    
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.set(1);

    ball.body.gravity.set(0, 201); 
    
    
    player = game.add.sprite(100, 200, 'player');
    //player.scale.setTo(0.15,0.15);

    this.game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    
    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
    weapon.trackSprite(player, 10, 400);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}
 
function update () {
    this.game.physics.arcade.collide(player, platforms);
    this.game.physics.arcade.collide(ball, platforms);
    
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (fireButton.downDuration(0.2))
    {
        weapon.fire();
    }           
}

function render () {

    //game.debug.spriteInfo(ball, 32, 32);

}