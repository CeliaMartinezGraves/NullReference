class GameObject extends Phaser.Sprite{

// Se llama con new GameObject(x, y, img)
// asigana los valores al gameObject para luego poder utilizarlos más adelante
	constructor (posX, posY, label){
		super(game, posX, posY, label);
		this.x = posX;
		this.y = posY;
		this.label = label;// IMPORTANTE ASIGNAR ETIQUETA ANTES DE CREAR O CARGAR
		game.physics.arcade.enable(this);
	}


// RESTO DE FUNCIONES
// Aunque sean preload, create, etc, hay que hacer llamadas para que se activen
// ya que esto es js no phaser (al ir por clases)

// Añade al game en pos (x, y)
	create(){
		game.add.existing(this);
	}

// cambia el tamaño a widthXheigth
	resize(width, height){
		this.obj.scale.setTo(width, height); 
	}

}















/*var Bubble = {
	nivel : 8,
	
	constructor (lvl, posX, posY, image){
		var nivel = lvl;
		var imagen = image;
	},

	constructor(){},

	preload: function () {
		game.load.image('ballImage', imagen);
		this.scale.setTo(bublleSmall * nivel, bublleSmall*nivel);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.setTo(75, 200);
		this.body.collideWorldBounds = true;

		this.body.bounce.set(1);

   		this.body.gravity.set(0, 201);
	},

	render: function(){
			game.add.sprite(posY, posY, 'ballImage');
	}
};*/