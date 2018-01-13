
// Carga las imágenes
class Preload extends Phaser.State{
	// Método del ciclo de vida de objetos de phaser 
	// Se lanza el primero de todos, como el Start/Awake de Unity
	// Lo he quitado de la constructora porque era muy cutre
	init(){
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

		this.sheets = [
			'player', 'images/spriteSheetTest.png'
		];
	}

	preload(){
		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}
		// Carga el spritesheet
		game.load.spritesheet(this.sheets[0], this.sheets[1], 1601/4, 2397/4);

		console.log('preload preload');
	}

	create(){
		console.log('preload create');

		game.add.sprite(0, 0, 'loading');
		
		game.state.start('GameTitle'); // Lanza el estado siguiente
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
		game.state.start('LoadLevel'); // Lanza el estado siguiente
	}
}

class LoadLevel extends Phaser.State{
	init(){
		cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
			'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
			'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.ENTER});

		// numero de plataformas
		platforms = [
			new Platform(300, 300, 'platform'),
			new Platform(200, 200, 'platform')
		];

		bubbles = [
			new Bubble(300, 100, 'ball', -100, 150, 3),
			new GravityBubble(100, 100, 'gball', 100, 150, 3)
		];

		fall = new VerticalMovable (300, 20, 'fall', 25);

		player = new Player ( 'player',250, 0, cursors);

	}

	create(){
		fall.resize(0.15, 0.15); // Prque la imagen es muy grande
		player.resize(0.2, 0.2);
		game.state.start('Main'); // Lanza el estado siguiente
	}
}

// Juego principal
class Main extends Phaser.State{

	preload(){
		console.log('Main preload');
	}

	create(){
		fall.create();

		for (i = 0; i < platforms.length; i++)
			platforms[i].create();

		for (i = 0; i < bubbles.length; i++)
			bubbles[i].create();
		
		player.create();
		
		console.log('Main create');
	}

	update(){
	// Colisiones de todas las plataformas con todas las burbujas
		game.physics.arcade.collide(platforms, bubbles); 
	}

	render(){
		player.gancho.render();
	}
	
}