
class GameObject {

// Se llama con new GameObject(x, y, img)
// asigana los valores al gameObject para luego poder utilizarlos más adelante
	constructor (posX, posY, image, label){
		this.posX = posX;
		this.posY = posY;
		this.image = image;
		this.label = label;// IMPORTANTE ASIGNAR ETIQUETA ANTES DE CREAR O CARGAR

		this.obj = this; // Para que en los hijos se pueda utilizar obj
	}

// RESTO DE FUNCIONES
// Aunque sean preload, create, etc, hay que hacer llamadas para que se activen
// ya que esto es js no phaser (al ir por clases)


// carga la imagen con la etiqueta que sea
// Si varios objetos utilizan la misma imagen, no es necesario cargarla en todos, 
// con acargarla en el primer GO ya es suficiente porque todos tiran de la misma etiqueta en cache
	preload(){
		game.load.image(this.label, this.image); //funciona
	}

// coloca en posX, posY
	create(){
		this.obj = game.add.sprite(this.posX, this.posY, this.label); //funciona
	}

// cambia el tamaño a widthXheigth
	resize(width, heigth){
		this.obj.scale.setTo(width, heigth); //funciona
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