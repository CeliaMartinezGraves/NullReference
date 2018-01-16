'use strict';


var game = new Phaser.Game(800, 600, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render });

var cursors, cursorsWASD, cursorsCHEATS, fall;
var bubbles, platforms, players, secondPly; // grupos con las burbujas, plataformas y jugadores
var i;
var currentLevel = 0;// nivel de juego
var timeLeftLevel; // timepo restante para pasarse el nivel
var _timeBetweenLevels = 200; // tiempo entre niveles (lo que tarda en bailar)
var nivelAcabado = false; // True mientras se ejecuta cosas inter niveles
var cheats = true; // Solo permite cheats si esta a true
var numVidasInicio = 3; // numero inicial de vidas

function preload(){

	cheats = true;
	// inicializa los FPS deseados
	game.time.advancedTiming = true;
    game.time.desiredFps = 40;

    // Inicializa bubbles, plataforms y fisicas
	bubbles = [];
	platforms = [];
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// si los cheats estan activados, carga los cursores que necesita
		if(cheats){
			cursorsCHEATS = game.input.keyboard.addKeys({'nextLVL': Phaser.KeyCode.NUMPAD_ADD, 'prevLVL': Phaser.KeyCode.NUMPAD_SUBTRACT}); //'up': Phaser.KeyCode.UP
		}

	// Añade estados
	game.state.add('Preload', new Preload(), false); // Añade el estado preload al game
	game.state.add('GameTitle', new GameTitle(), false);
	game.state.add('LoadLevel', new LoadLevel(), false); // lectura de nivel
	game.state.add('Main', new Main(), false); // bucle principal del juego
	game.state.add('Credits', new Credits(), false); // creditos

	game.state.start('Preload'); // hace que el game se inicie desde aqui y lance el Preload
}

function create() {
		
}


function update(){

}

function render(){

}
