
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
			'title', 'images/title.png', // Pantalla de inicio
		];

		this.sheets = [
			'player', 'images/player1.png', 1600/4, 1200/3,
			'button', 'images/buttons.png', 200/2, 82/2// boton del menu de inicio
		];

		// Mapas de juego
    	this.maps = ['lvl0', 'levels/level00.ping']; 

		secondPly = false; //desactiva el 2º jugador
	}

	preload(){
		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}
		// Carga los spritesheet
		for(var i = 0; i < this.sheets.length; i+=4){
			game.load.spritesheet(this.sheets[i], this.sheets[i+1], this.sheets[i+2], this.sheets[i+3]);
		}

		 this.txt = game.load.json('lvl0', 'levels/level00.json'); // carga el archivo 

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

	init(){
		game.add.sprite(0, 0, 'title');
		
		// Añade los botones y el texto que tienen (el texto es a parte, por eso se ve tan meh)
		game.add.button((window.innerWidth/3)-(50), (window.innerHeight/2) + 100, 'button', 
		this.onButtonPressed, this, 0, 1, 2); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3)-(50), (window.innerHeight/2) + 100, "1 player");
		
		game.add.button((window.innerWidth/3*2)-(50), (window.innerHeight/2) + 100, 'button', 
		this.on2ndPlyrPressed, this, 0, 1, 2); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3*2)-(50), (window.innerHeight/2) + 100, "2 players");

	}

	preload(){
		console.log('GameTitle preload');
	}

	create(){
		console.log('GameTitle create');
		//game.state.start('LoadLevel'); // Lanza el estado siguiente
	}

	// Pone el booleano del 2º jugador a true
	on2ndPlyrPressed(){
		console.log('pulsandooo 2');
		secondPly = true; // activa el uso del segundo jugador
		this.onButtonPressed();
	}
	// lanza el lector de nivel
	onButtonPressed(){
		console.log('pulsandooo');
		game.state.start('LoadLevel'); // Lanza el estado siguiente
	}
	
}

class LoadLevel extends Phaser.State{
	init(){

		console.log(secondPly);
		this.level = game.cache.getJSON('lvl0'); 

		cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
			'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
			'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.ENTER});

		if(secondPly){
			cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 
				'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 
				'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});
		}

    	// numero de plataformas 
   		for (var i = 0; i < this.level[currentLevel].plat.length; i++) { 
    	  platforms.push(new Platform(this.level[currentLevel].plat[i].x, this.level[currentLevel].plat[i].y, 'platform')); 
    	} 
 
 		// num burbujas
    	for (var i = 0; i < this.level[currentLevel].ball.length; i++) { 
     		if(this.level[currentLevel].ball[i].t === 0) 
     	 	bubbles.push(new Bubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, 'ball', 100, 100, this.level[currentLevel].ball[i].lvl)); 
     		else 
    	    bubbles.push(new GravityBubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, 'gball', 100, 100, this.level[currentLevel].ball[i].lvl)); 
    	} 
 
    	fall = new VerticalMovable (300, 20, 'fall', 50); 
    	console.log(bubbles); 


		if(secondPly){
			players = [
				new Player ( 'player',250, 0, cursors), 
				new Player ( 'player',250, 0, cursorsWASD)
			];
			players[0].resize(0.2, 0.2);
			players[1].resize(0.2, 0.2);
		}else{
			players = [
				new Player ( 'player',250, 0, cursors)
			];
			players[0].resize(0.2, 0.2);
		}
		
	}

	create(){
		fall.resize(0.15, 0.15); // Prque la imagen es muy grande
		
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
	
		for(i = 0; i < players.length; i++)
			players[i].create();

		console.log(players[0].gancho);
		
		console.log('Main create');
	}

	update(){
	// Colisiones de todas las plataformas con todas las burbujas
		game.physics.arcade.collide(platforms, bubbles); 

		for(i = 0; i < players.length; i++){
			if(players[i].gancho.alive){
				game.physics.arcade.collide(players[i].gancho, bubbles, this.overlapGanchoBurbuja, null, this);
				game.physics.arcade.overlap(players[i].gancho, platforms, this.overlapGanchoPlataforma, null, this);
			}
		}
	}

	render(){
		for(i = 0; i < players.length; i++)
			players[i].gancho.render();
	}

	overlapGanchoBurbuja(gancho,bubble){
		console.log('overlapGanchoBurbuja');

		gancho.die();
		bubble.die(bubbles);

	}

	overlapGanchoPlataforma(gancho,platform){
		console.log('overlapGanchoPlataforma');
		gancho.die();

	}
	
}