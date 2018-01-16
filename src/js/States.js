
// Carga las imágenes
class Preload extends Phaser.State{
	// Método del ciclo de vida de objetos de phaser 
	// Se lanza el primero de todos, como el Start/Awake de Unity
	// Lo he quitado de la constructora porque era muy cutre
	init(){
		// Guarda en el array la etiqueta y la ruta de la imagen a cargar
		this.images = [
			'platform', 'images/sprites/platform.png',
			'ball', 'images/sprites/blueball.png', 
			'gball', 'images/sprites/redball.png', 
			'fall', 'images/sprites/phaser.png',
			'hook', 'images/sprites/hookTop.png',

			'loading', 'images/fondos/loading.png', // Pantalla de carga
			'title', 'images/fondos/title.png' // Pantalla de inicio
		];

		this.sheets = [
			'player', 'images/sprites/player1.png', 1600/4, 1200/3,
			'player2', 'images/sprites/player2.png', 1600/4, 1200/3,
			'button', 'images/botones/buttons.png', 200/2, 82/2// boton del menu de inicio
		];

		this.audios = [
			'background1' ,'music/ChibiNinja.mp3', 1, true,			//1 es el volumen, true es si es en loop

		];

		// Mapas de juego
    	this.maps = ['lvl', 'levels/levels.ping']; 

		secondPly = false; //desactiva el 2º jugador
		
	}

	preload(){
		
		console.log(cursorsCHEATS);

		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}
		// Carga los spritesheet
		for(var i = 0; i < this.sheets.length; i+=4){
			game.load.spritesheet(this.sheets[i], this.sheets[i+1], this.sheets[i+2], this.sheets[i+3]);
		}

		for(var i = 0; i < this.audios.length;i+=4){
			game.load.audio(this.audios[i],this.audios[i+1],this.audios[i+2],this.audios[i+3])
		}

		 this.txt = game.load.json('lvl', 'levels/levels.json'); // carga el archivo 

		console.log('preload preload');
	}

	create(){
		console.log(cheats);
		
		

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
		nivelAcabado = false;
		console.log("load level " + currentLevel);

		if(this.level === undefined) // Si no esta cogido el archivo
			this.level = game.cache.getJSON('lvl'); 

		// INICIALIZADO DE CURSORES
		if(secondPly){
			cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
			'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
			'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.ENTER});

			cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 
				'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 
				'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});

		}else{

			cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
			'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
			'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.SPACEBAR});
		}

		// LECTURA DE NIVEL
		var levelFound = false;
		// while y booleano para evitar que intente leer niveles que no existen y estalle
		while(!levelFound && currentLevel >= 0)
		{
			if(currentLevel < this.level.length){ // Solo carga nivel si existe
				levelFound = true;
				timeLeftLevel = this.level[currentLevel].time; // añade los segundos en los que hay que acabar el nivel
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
		    } 
		    else
		    	currentLevel--;
		}
 
    	fall = new VerticalMovable (300, 20, 'fall', 50); 

    	// CREA PLAYERS
		if(secondPly){
			players = [
				new Player ( 'player',250, 0, cursors, 1), 
				new Player ( 'player2',250, 0, cursorsWASD, 2)
			];
			players[0].resize(0.2, 0.2);
			players[1].resize(0.2, 0.2);
		}else{
			players = [
				new Player ( 'player',250, 0, cursors, 1)
			];
			players[0].resize(0.2, 0.2);
		}

		backgroundmusic = game.add.audio('background1');
		
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
		backgroundmusic.play();
		fall.create();

		for (i = 0; i < platforms.length; i++)
			platforms[i].create();

		for (i = 0; i < bubbles.length; i++)
			bubbles[i].create(i); // hay que pasarle su pos en el array para que luego se pueda destruir
	
		for(i = 0; i < players.length; i++)
			players[i].create();
		
		console.log('Main create');
	}

	update(){

		if(bubbles.length > 0){ // Si aun quedan burbujas
		// Colisiones de todas las plataformas con todas las burbujas
			game.physics.arcade.collide(platforms, bubbles); 
	
			for(i = 0; i < players.length; i++){
				if(players[i].gancho.alive){
					game.physics.arcade.overlap(players[i].gancho, platforms, this.overlapGanchoPlataforma, null, this);
					game.physics.arcade.overlap(players[i].gancho, bubbles, this.overlapGanchoBurbuja, null, this);
				}
			}
	
			game.physics.arcade.overlap(players, bubbles, this.overlapPlayerBurbuja, null, this);
		}else if(!nivelAcabado){
			nivelAcabado = true;
			console.log('holii');

			this.winLevel();
		}

		// Si los cheats estan activados, los procesa
		if(cheats){
			this.handleCheats();
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

	overlapPlayerBurbuja(player,bubble){
		// restaria vidas al player que choca
	}

	winLevel(){
		for(i = 0; i < players.length; i++)
			players[i].dance();

		game.time.events.add(Phaser.Timer.SECOND * _timeBetweenLevels, this.loadLevel, this, currentLevel + 1);
	}

	// lee y carga el nivel 'level'
	loadLevel(level){
		currentLevel = level;
		bubbles = [];
		platforms = [];
		game.state.start('LoadLevel');
	}

	handleCheats(){

		if(cursorsCHEATS.nextLVL.downDuration(0.1)){
			this.loadLevel(currentLevel + 1);
			
		}else if(cursorsCHEATS.prevLVL.downDuration(0.1)){
			this.loadLevel(currentLevel - 1);
		}

	}
	
}

class Credits extends Phaser.State{

}