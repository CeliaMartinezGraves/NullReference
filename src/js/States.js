
// Carga las imágenes
class Preload extends Phaser.State{
	// Método del ciclo de vida de objetos de phaser 
	// Se lanza el primero de todos, como el Start/Awake de Unity
	// Lo he quitado de la constructora porque era muy cutre
	init(){
		// Guarda en el array la etiqueta y la ruta de la imagen a cargar
		this.images = [
			//'platform', 'images/sprites/platform.png',
			'ball', 'images/sprites/blueball.png', 
			'gball', 'images/sprites/redball.png', 
			'hook', 'images/sprites/hookTop.png',
			'backTime', 'images/sprites/backTime.png',

			'dobleg', 'images/sprites/dobleg.png',

			'blueGhost', 'images/sprites/blueghostball.png', 
			'orangeGhost', 'images/sprites/orangeghostball.png', 
			'pacman', 'images/sprites/pacmanball.png', 
			'pinkGhost', 'images/sprites/pinkghostball.png', 
			'redGhost', 'images/sprites/redghostball.png', 

			'loading', 'images/fondos/loading.png', // Pantalla de carga
			'title', 'images/fondos/title.jpg', // Pantalla de inicio
			'controls', 'images/fondos/controles.png',
			'credits', 'images/fondos/creditos.png',
			'gameover', 'images/fondos/gameover.png',
			'winner', 'images/fondos/Winner.png',

			'return', 'images/botones/return.png'

			
		];

		this.sheets = [
			//label, ruta, anchoFrame, altoFrame
			'player', 'images/sprites/player1.png', 1056/4, 1080/3,
			'player2', 'images/sprites/player2.png', 1056/4, 1080/3,
			'button', 'images/botones/buttons.png', 448/2, 84, // boton del menu de inicio
			'mutebutton', 'images/botones/mutebutton.png', 64/2, 32,
			'normalBackground', 'images/fondos/backgrounds.jpg', 800, 600,
			'platform', 'images/sprites/platform.png', 100, 34/2,
			'vida','images/sprites/vida.png', 44, 120/2
		];

		// Fondos especiales de un solo "uso"
		this.specialBackgrounds = [
			'pacmanBack', 'images/special/pacman.png',
			'bobble', 'images/special/bubbleBobble back.jpg',
			'tloz', 'images/special/tloz timeTemple.png', 
			'mario', 'images/special/Mario background.png'
		];

		this.audios = [
			'background1' ,'music/ChibiNinja.mp3', 
			'pasoDeNivel','music/pasoDeNivel.mp3', 
			'explosion','music/Explosion.mp3',
			'menumusic','music/Jumpshot.mp3',
			'hurt','music/hurt.mp3',
			'gameOverSound', 'music/KLPeachGameOver.mp3',
			'winSound', 'music/Victory.mp3'
		];

		// Mapas de juego
    	this.maps = ['lvl', 'levels/levels.json']; 

		secondPly = false; //desactiva el 2º jugador	
		
	}

	preload(){
		this.load.spritesheet('animload',  'images/sprites/redballLoadingSheet.png', 30, 30); // Lee animacion de cargas

		this.loadingEverything(game);
		
		console.log('preload preload');
	}

	create(){
		
		this.loading = this.add.sprite(game.width/2 - 45, game.height/2 - 45, 'animload');
		this.loading.scale.setTo(3, 3); 
		this.loading.animations.add('load');
		this.loading.animations.play('load',  7, true);

		console.log(cheats);

		

		console.log('preload create');
		
		game.state.start('GameTitle'); // Lanza el estado siguiente
	}

	loadingEverything(game){
		console.log("CARGANDOOOO");
		console.log(cursorsCHEATS);

		// Carga todas las imagenes del array y les asigna su etiqueta
		for(var i = 0; i < this.images.length; i+=2){
			game.load.image(this.images[i], this.images[i+1]);
		}
		// Carga los spritesheet
		//label, ruta, anchoFrame, altoFrame, nº frames, margen, espaciado
		for(var i = 0; i < this.sheets.length; i+=4){
			game.load.spritesheet(this.sheets[i], this.sheets[i+1], this.sheets[i+2], this.sheets[i+3]);
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

		game.add.button((window.innerWidth/3)-(100), (window.innerHeight/2) + (200), 'button', 
		this.onControlsPressed, this,  0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3)-(50), (window.innerHeight/2) + (225), "controls");

		game.add.button((window.innerWidth/3*2)-(50), (window.innerHeight/2) + (200), 'button', 
		this.onCreditsPressed, this,  0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3*2), (window.innerHeight/2) + (225), "credits");


		mute = game.add.button(10, 10, 'mutebutton', this.onMutePressed, this, 0); // 50 e 1/2 del ancho de la imagen utilizada

	}

	preload(){
		console.log('GameTitle preload');
	}

	create(){

		if(!menumusic.isPlaying){
			menumusic.play();
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
		submenu = 'controls';
		game.state.start('SubMenu');
	}

	onCreditsPressed(){
		console.log('pulsando controls');
		submenu = 'credits';
		game.state.start('SubMenu');
	}
	
}

class LoadLevel extends Phaser.State{
	init(){
		nivelAcabado = false;

		if(currentLevel === 5)
			TPV = true;
		else
			TPV = false;

		// INICIALIZADO DE CURSORES
		cursorsWASD = game.input.keyboard.addKeys({'up': Phaser.KeyCode.W, 
				'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 
				'right': Phaser.KeyCode.D, 'fireButton': Phaser.KeyCode.SPACEBAR});

		// CREA PLAYERS
		if(secondPly){
			cursors = game.input.keyboard.addKeys({'up': Phaser.KeyCode.UP, 
				'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 
				'right': Phaser.KeyCode.RIGHT, 'fireButton': Phaser.KeyCode.ENTER});
		
			players = [
				new Player ( 'player', 250, 0, cursorsWASD, 1), 
				new Player ( 'player2', 250, 0, cursors, 2)
			];
			players[0].resize(0.2, 0.2);
			players[1].resize(0.2, 0.2);		
		}
		else {
		
			players = [
				new Player ( 'player',250, 0, cursorsWASD, 1)
			];
			players[0].resize(0.2, 0.2);
		}
		
		
		console.log("load level " + currentLevel);

		if(this.level === undefined) // Si no esta cogido el archivo
			this.level = game.cache.getJSON('lvl');

		// LECTURA DE NIVEL
		var levelFound = false;

		// while y booleano para evitar que intente leer niveles que no existen y estalle
		if(!levelFound && currentLevel >= 0 && currentLevel < this.level.length) {

			// Solo carga nivel si existe
			levelFound = true;
			timeLeftLevel = this.level[currentLevel].time; // añade los segundos en los que hay que acabar el nivel
		    // numero de plataformas 
		   	for (var i = 0; i < this.level[currentLevel].plat.length; i++) { 
		   		if(this.level[currentLevel].plat[i].t === 0) 
		    		platforms.push(new Platform(this.level[currentLevel].plat[i].x, this.level[currentLevel].plat[i].y, 'platform', this.level[currentLevel].plat[i].rot)); 
		    	else
		    		platforms.push(new BreakablePlatform(this.level[currentLevel].plat[i].x, this.level[currentLevel].plat[i].y, 'platform', this.level[currentLevel].plat[i].rot)); 


		    } 
		 
			 // num burbujas
		    for (var i = 0; i < this.level[currentLevel].ball.length; i++) {
		    	var dirVel = this.level[currentLevel].ball[i].dirX;
		    	if (TPV){
		    		var Pacman = ['pacman', 'blueGhost', 'orangeGhost', 'pinkGhost','redGhost'];

		   			if(this.level[currentLevel].ball[i].t === 0) 
		   		 	 	bubbles.push(new Bubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, Pacman[Math.trunc(Math.random()*4 + 1)], 185*dirVel, 185, this.level[currentLevel].ball[i].lvl)); 
		   		 	else 
		   			    bubbles.push(new GravityBubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, Pacman[0], 100*dirVel, 100, this.level[currentLevel].ball[i].lvl));
		   		}else{

		   			if(this.level[currentLevel].ball[i].t === 0) 
		   		 	 	bubbles.push(new Bubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, 'ball', 175*dirVel, 175, this.level[currentLevel].ball[i].lvl)); 
		   		 	else 
		   			    bubbles.push(new GravityBubble(this.level[currentLevel].ball[i].x, this.level[currentLevel].ball[i].y, 'gball', 100*dirVel, 100, this.level[currentLevel].ball[i].lvl));
		   		}
		    } 
		}else if(currentLevel === this.level.length){
			game.state.start('Win');
		}

		backgroundmusic = game.add.audio('background1');
		backgroundmusic.loop = true;
		pasoDeNivel = game.add.audio('pasoDeNivel');
		explosion = game.add.audio('explosion');
		daño = game.add.audio('hurt');
		
	}

	create(){
		
		game.state.start('Main'); // Lanza el estado siguiente
	}
}

// Juego principal
class Main extends Phaser.State{

	init(){
		this.backLevels = ['normalBackground', 'pacmanBack', 'bobble','mario', 'tloz']; // Etiquetas de los niveles y los niveles especiales
		this.getBackground();
		mute = game.add.button(0, 0, 'mutebutton', this.onMutePressed, this, 0);

		//this.timer = game.time.events.add(Phaser.Timer.SECOND * timeLeftLevel, this.loadLevel, this, currentLevel);
		this.timer = game.time.create(false);
		this.timer.add(timeLeftLevel*1000, this.lessLifeByTimer, this, currentLevel);
		this.timer.start();

		this.backTime = this.add.sprite((window.innerWidth/2)-(56), 20, 'backTime');
		this.text = game.add.text((window.innerWidth/2)-(25), 30, Math.trunc(this.timer.duration/1000 +1), {font: "40px Arial", fill: 'black'});

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

			for(var j = 0; j<players[i].numVidas; j++){
				players[i].GUI[j].create(j*25);
			}
		}
		
		console.log('Main create');
	}

	update(){

		if(powerups != null && powerups.length > 0)
			game.physics.arcade.overlap(players, powerups, this.overlapPlayerPowerUp, null, this);

		if(bubbles.length > 0){ // Si aun quedan burbujas
		// Colisiones de todas las plataformas con todas las burbujas
			game.physics.arcade.collide(platforms, bubbles); 
			game.physics.arcade.overlap(players, bubbles, this.overlapPlayerBurbuja, null, this);

			for(var i = 0; i < players.length; i++){
				for(var j = 0; j < players[i].ganchos.length; j++){
					if(players[i].ganchos[i].alive){
						players[i].ganchos[i].handleCollisions(bubbles,platforms);
						console.log("holiiii");
						console.log(i);
						console.log(players[i]);
					}
				}
				console.log("vuelta");
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
		for(i = 0; i < players.length; i++){
			for(var j = 0; j < players[i].ganchos.length; j++)
				players[i].ganchos[j].render();
		}
		this.text.text = Math.trunc(this.timer.duration/1000 +1);
	}

	overlapPlayerBurbuja(player, burbuja){
		console.log('player se choco con burbuja malvada');
		player.lessLife();
		if(player.getVidas() >0)
			game.time.events.add(Phaser.Timer.SECOND * 1.5, this.loadLevel, this, currentLevel);
		else
			game.time.events.add(Phaser.Timer.SECOND * 1.5, this.endGame, this);


	}

	overlapPlayerPowerUp(player,powerup){
		console.log("overlapPlayerPowerUp");
		powerup.powers(player);
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
		}else if(cursorsCHEATS.T.isDown && cursorsCHEATS.P.isDown && cursorsCHEATS.V.isDown){
			this.loadLevel(5);
		}
		else if(cursorsCHEATS.P.downDuration(0.1)){
			for(i = 0; i < platforms.length; i++)
				platforms[i].platDeLaConstruccion();
		}

	}

	onMutePressed(){
		if(game.sound.mute){
			game.sound.mute=false;
			mute.setFrames(0);
		}
		else{
			game.sound.mute=true;
			mute.setFrames(1);
		}
	}

	// leer niveles para que cada 5 sea uno de los especiales
	getBackground(){

		if(currentLevel%5 != 0){
			currentBack = this.backLevels[0];
		}else{
			currentBack = this.backLevels[currentLevel/5];
		}

		var numframe = currentLevel-Math.trunc(currentLevel/5);// Math.trunc(currentLevel/5) para que trunque el resultado 
     
   	 	console.log(currentLevel%5 + ' frame: '+ numframe); 
 
    	if((currentLevel%5) != 0){ 
      		var back = game.add.sprite(0, 0, currentBack, numframe);
      		back.animations.currentFrame = numframe;
      		console.log(back);
    	}else{ 
      		game.add.sprite(0, 0, currentBack); 
    	} 
	}

	endGame(){
		game.state.start('Death');
	}

	lessLifeByTimer(){
		for(i = 0; i < players.length; i++){
			players[i].lessLife();	

			if(players[i].getVidas() >0)
				game.time.events.add(Phaser.Timer.SECOND * 1.5, this.loadLevel, this, currentLevel);
			else
				game.time.events.add(Phaser.Timer.SECOND * 1.5, this.endGame, this);
		}
	}
	
}

class SubMenu extends Phaser.State{
	init(){

		game.add.sprite(0,0, submenu);

		game.add.button((window.innerWidth)-(100), 10, 'return', 
		this.onButtonPressed, this); // 50 e 1/2 del ancho de la imagen utilizado
		mute = game.add.button(10, 10, 'mutebutton', this.onMutePressed, this, 0); // 50 e 1/2 del ancho de la imagen utilizada

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

class Death extends Phaser.State{

	init(){
		gameOverSound = game.add.audio('gameOverSound');
		

		game.add.sprite(0,0, 'gameover');

		// Añade los botones y el texto que tienen (el texto es a parte, por eso se ve tan meh)
		game.add.button((window.innerWidth/3)-(100), (window.innerHeight/2) + 100, 'button', 
		this.onContinuePressed, this, 0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3)-(50), (window.innerHeight/2) + 125, "Continue");
		
		game.add.button((window.innerWidth/3*2)-(50), (window.innerHeight/2) + 100, 'button', 
		this.onMenuPressed, this, 0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/3*2), (window.innerHeight/2) + 125, "Menu");

	}

	create(){
		gameOverSound.play();
	}


	onContinuePressed(){
		bubbles = [];
		platforms = [];

		for(i = 0; i < players.length; i++)
			vidasPlayers[i] = numVidasInicio;
		game.state.start('LoadLevel');
	}

	onMenuPressed(){
		currentLevel = 1;
		bubbles = [];
		platforms = [];
		for(i = 0; i < players.length; i++)
			vidasPlayers[i] = numVidasInicio;
		game.state.start('GameTitle');
	}

}

class Win extends Phaser.State{

	init(){
		game.sound.stopAll();
		winSound = game.add.audio('winSound');

		game.add.sprite(0,0, 'winner');
		
		game.add.button((window.innerWidth/2)-(100), (window.innerHeight/2) + 100, 'button', 
		this.onMenuPressed, this, 0, 1); // 50 e 1/2 del ancho de la imagen utilizada
		game.add.text((window.innerWidth/2)-25, (window.innerHeight/2) + 125, "Menu");

	}

	create(){

		winSound.play();
	}

	onMenuPressed(){
		currentLevel = 1;
		bubbles = [];
		platforms = [];
		for(i = 0; i < players.length; i++)
			vidasPlayers[i] = numVidasInicio;
		game.state.start('GameTitle');
	}
}