class GameObject extends Phaser.Sprite{

// Se llama con new GameObject(x, y, img)
// asigana los valores al gameObject para luego poder utilizarlos más adelante
	constructor (posX, posY, label){
		super(game, posX, posY, label);
		this.label = label;// IMPORTANTE ASIGNAR ETIQUETA ANTES DE CREAR O CARGAR
		game.physics.arcade.enable(this); // añade físicas
	}


// RESTO DE FUNCIONES
// Aunque sean preload, create, etc, hay que hacer llamadas para que se activen
// ya que esto es js no phaser (al ir por clases)
	create(){
		// Añade al game en pos (x, y) un objeto que ya existe
		game.add.existing(this); 
	}

// cambia el tamaño a widthXheigth
	resize(width, height){
		this.scale.setTo(width, height); 
	}

// cambia la posicion del GO
	moveTo(x,y){
		this.x = x;
		this.y = y;
	}
}
