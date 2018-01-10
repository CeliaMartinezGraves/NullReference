
// Carga las imágenes
class Preload extends Phaser.State{

	constructor(){
		super();
		// Guarda en el array la etiqueta y la ruta de la imagen a cargar
		this.images = [
			'platform', 'images/platform.png',
			'ball', 'images/pokemonicon.png', 
			'gball', 'images/pokemoniconred.png', 
			'fall', 'images/phaser.png', 
			'dude', 'images/dude.png',
			'dude2', 'images/dude2.png',
			'hook', 'images/hookTop.png',

			'loading', 'images/loading.png', // Pantalla de carga
			'title', 'images/title.png' // Pantalla de inicio
		];
	}

	preload(){
		

		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}

		console.log('preload preload');

	}

	create(){
		console.log('preload create');
		game.add.sprite(0, 0, 'loading');
		
		game.state.start('GameTitle');
	}

	update(){

	}
}

// Pantalla de inicio
class GameTitle extends Phaser.State{

	preload(){
		console.log('GameTitle preload');
	}

	create(){
		console.log('GameTitle create');
		game.add.sprite(0, 0, 'title');
		game.state.start('Main');
	}

	update(){

	}
}

// Juego
class Main extends Phaser.State{

	preload(){
		cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
			'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
			'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.L});

		go = new Platform('platform', game);
		//go2 = new Platform(300,300, 'platform');

		//bubbles = [
			ball = new Bubble(300, 100, 'ball', -100, 150, 3, bubbles),
			grvball = new GravityBubble(200, 100, 'gball', 100, 150, 3, bubbles),
		//];



		console.log('Main preload');
	}

	create(){

		go.create (300, 300);
		//go.create(300,300);

		//console.log(Object.keys(platformsGroup.children));

		/*for(i = 0; i < bubbles.length; i++){
			bubbles[i].create();
		}*/
		grvball.create();
		ball.create();

		game.physics.arcade.enable([ball, go]);
		//console.log(Object.keys(bubbles.children));

		//game.physics.enable ([go,ball], Phaser.Physics.ARCADE);
		console.log('Main create');
	}

	update(){
		game.physics.arcade.collide(go, ball.obj);
		game.physics.arcade.collide(go, grvball.obj);
	}

	render(){

	}
	
}