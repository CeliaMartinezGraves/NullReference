// Maneja el GUI del juego
class GUI extends GameObject{
	constructor(posOrigX, GUIheigth, label, labelBordes){
		super(0, GUIheigth, label);
		this.posOrigX = posOrigX;
	}

	create(posX){
		this.x = this.posOrigX+posX;
		this.resize(0.1, 0.1);
		this.animations.currentFrame = 9;
		console.log(this);
		super.create();
	}
}