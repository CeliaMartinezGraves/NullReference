
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
			'title', 'images/fondos/title.jpg', // Pantalla de inicio
			'controls', 'images/fondos/controles.png',

			'return', 'images/botones/return.png'
		];

		this.sheets = [
			//label, ruta, anchoFrame, altoFrame, nº frames, margen, espaciado
			'player', 'images/sprites/player1.png', 1600/4, 1200/3, , , ,
			'player2', 'images/sprites/player2.png', 1600/4, 1200/3, , , ,
			'button', 'images/botones/buttons.png', 448/2, 84, , , , // boton del menu de inicio
			'mutebutton', 'images/botones/mutebutton.png', 64/2, 32, , , ,
			'normalBackground', 'images/fondos/backgrounds.jpg', 4467/2, 33602/20, 40, 134, 199
		];

		// Fondos especiales de un solo "uso"
		this.specialBackgrounds = [
			'bobble', 'images/special/bubbleBobble back.jpg',
			'tloz', 'images/special/tloz timeTemple.png', 
			'mario', 'images/special/Mario background.png'
		];

		this.audios = [
			'background1' ,'music/ChibiNinja.mp3', 
			'pasoDeNivel','music/pasoDeNivel.mp3', 
			'explosion','music/Explosion.mp3',
			'menumusic','music/Jumpshot.mp3'

		];

		// Mapas de juego
    	this.maps = ['lvl', 'levels/levels.json']; 

		secondPly = false; //desactiva el 2º jugador
		
	}

	preload(){
		
		console.log(cursorsCHEATS);

		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}
		// Carga los spritesheet
		//label, ruta, anchoFrame, altoFrame, nº frames, margen, espaciado
		for(var i = 0; i < this.sheets.length; i+=7){
			game.load.spritesheet(this.sheets[i], this.sheets[i+1], this.sheets[i+2], this.sheets[i+3], this.sheets[i+4], this.sheets[i+5], this.sheets[i+6]);
			console.log('spritesheet '+ i);
		}
		// Carga los fondos especiaes
		for(var i = 0; i<this.specialBackgrounds.length; i+=2){
			game.load.image(this.specialBackgrounds[i], this.specialBackgrounds[i+1]);
		}
		// Carga los audios
		for(var i = 0; i < this.audios.length;i+=2){
			game.load.audio(this.audios[i],this.audios[i+1]);
		}

		 this.txt = game.load.json(this.maps[0], this.maps[1]); // carga el archivo 

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
		if(menumusic==null){
			menumusic = game.add.audio('menumusic');
			menumusic.loop = true;
		}

		game.add.sprite(0, 0, 'title');
		
		// Añade los botones y el texto que tienen (el texto es a parte, por eso se ve tan meh)
		game.add.button((window.innerWidth/3)-(100), (window.innerHeight/2) + 100, 'button', 
		this.onButtonPressed, this, 0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3)-(50), (window.innerHeight/2) + 125, "1 player");
		
		game.add.button((window.innerWidth/3*2)-(50), (window.innerHeight/2) + 100, 'button', 
		this.on2ndPlyrPressed, this, 0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3*2), (window.innerHeight/2) + 125, "2 players");

		game.add.button((window.innerWidth/2)-(100), (window.innerHeight/2) + (200), 'button', 
		this.onControlsPressed, this,  0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/2)-(50), (window.innerHeight/2) + (225), "controls");


		mute = game.add.button(10, 10, 'mutebutton', this.onMutePressed, this, 0); // 50 e 1/2 del ancho de la imagen utilizada


	}

	preload(){
		console.log('GameTitle preload');
	}

	create(){

		if(!menumusic.isPlaying){
			menumusic.play();
			console.log('music is playing?' +menumusic.isPlaying);
		}
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
		nuevaPartida = true;
		console.log('pulsandooo');
		game.state.start('LoadLevel'); // Lanza el estado siguiente
	}

	onMutePressed(){
		if(game.sound.mute==true){
			game.sound.mute=false;
			mute.setFrames(0);
		}
		else{
			game.sound.mute=true;
			mute.setFrames(1);
		}

	}

	onControlsPressed(){
		console.log('pulsando controls');
		game.state.start('Controls');
	}
	
}

class LoadLevel extends Phaser.State{
	init(){
		nivelAcabado = false;
		this.backLevels = ['normalBackground', 'bobble','tloz','mario' ]; // Etiquetas de los niveles y los niveles especiales
		// INICIALIZADO DE CURSORES
		// CREA PLAYERS
		if(secondPly){
			cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
				'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
				'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.ENTER});
		
			cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 
				'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 
				'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});
		
			players = [
				new Player ( 'player', 250, 0, cursorsWASD, 1), 
				new Player ( 'player2', 250, 0, cursors, 2)
			];
			players[0].resize(0.2, 0.2);
			players[1].resize(0.2, 0.2);
		
		}
		else {
			cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 
				'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 
				'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});
		
			players = [
				new Player ( 'player',250, 0, cursors, 1)
			];
			players[0].resize(0.2, 0.2);
		}
		
		
		console.log("load level " + currentLevel);

		if(this.level === undefined) // Si no esta cogido el archivo
			this.level = game.cache.getJSON('lvl');

		// LECTURA DE NIVEL
		var levelFound = false;
		// while y booleano para evitar que intente leer niveles que no existen y estalle
		while(!levelFound && currentLevel >= 0) {
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

		backgroundmusic = game.add.audio('background1');
		backgroundmusic.loop = true;
		pasoDeNivel = game.add.audio('pasoDeNivel');
		explosion = game.add.audio('explosion');
		
	}

	create(){		
		game.state.start('Main'); // Lanza el estado siguiente
	}

	// leer niveles para que cada 5 sea uno de los especiales
	getBackground(){
		if(currentLevel%5 != 0){
			currentBack = this.backLevels[0];
		}else{
			currentLevel =this.backLevels[currentLevel/5];
		}
	}
}

// Juego principal
class Main extends Phaser.State{

	init(){
		mute = game.add.button(10, 10, 'mutebutton', this.onMutePressed, this, 0); // 50 e 1/2 del ancho de la imagen utilizada
	}

	preload(){
		console.log('Main preload');
	}

	create(){
		game.sound.stopAll();		//Para toda la música antes de empezar a sonar la nueva
		backgroundmusic.play();

		for (i = 0; i < platforms.length; i++)
			platforms[i].create();

		for (i = 0; i < bubbles.length; i++)
			bubbles[i].create(i); // hay que pasarle su pos en el array para que luego se pueda destruir
	
		for(i = 0; i < players.length; i++){
			console.log(players);
			console.log(vidasPlayers[i]);
			console.log(players[i]);
			players[i].create(vidasPlayers[i]);
		}
		
		console.log('Main create');
	}

	update(){

		if(bubbles.length > 0){ // Si aun quedan burbujas
		// Colisiones de todas las plataformas con todas las burbujas
			game.physics.arcade.collide(platforms, bubbles); 
	
			for(i = 0; i < players.length; i++){
				if(players[i].gancho.alive){
					players[i].gancho.handleCollisions(bubbles,platforms);
				}
			}

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

	overlapPlayerBurbuja(player,bubble){
		// restaria vidas al player que choca
	}

	winLevel(){
		backgroundmusic.stop();		//Para toda la música antes de empezar a sonar la nueva
		pasoDeNivel.play();
		for(i = 0; i < players.length; i++)
			players[i].dance();

		game.time.events.add(Phaser.Timer.SECOND * _timeBetweenLevels, this.loadLevel, this, currentLevel + 1);
	}

	// lee y carga el nivel 'level'
	loadLevel(level){
		currentLevel = level;
		bubbles = [];
		platforms = [];

		for(i = 0; i < players.length; i++)
			vidasPlayers[i] = players[i].getVidas();

		game.state.start('LoadLevel');
	}

	handleCheats(){

		if(cursorsCHEATS.nextLVL.downDuration(0.1)){
			this.loadLevel(currentLevel + 1);
			
		}else if(cursorsCHEATS.prevLVL.downDuration(0.1)){
			this.loadLevel(currentLevel - 1);
		}

	}

	onMutePressed(){
		if(game.sound.mute==true){
			game.sound.mute=false;
			mute.setFrames(0);
		}
		else{
			game.sound.mute=true;
			mute.setFrames(1);
		}

	}
	
}

class Credits extends Phaser.State{

}

class Controls extends Phaser.State{
	init(){

		game.add.sprite(10,10, 'controls');

		game.add.button((window.innerWidth)-(100), 10, 'return', 
		this.onButtonPressed, this); // 50 e 1/2 del ancho de la imagen utilizada


		mute = game.add.button(0, 0, 'mutebutton', this.onMutePressed, this, 0); // 50 e 1/2 del ancho de la imagen utilizada


	}

	onMutePressed(){
		if(game.sound.mute==true){
			game.sound.mute=false;
			mute.setFrames(0);
		}
		else{
			game.sound.mute=true;
			mute.setFrames(1);
		}

	}

	onButtonPressed(){
		console.log('pulsandooo');
		game.state.start('GameTitle'); // Lanza el estado siguiente
	}

}