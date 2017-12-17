class Platform extends GameObject{
	create(){
		super.create();
		game.physics.arcade.enable(this.obj);
		this.obj.body.immovable = true;
	}

	update(){
		 game.physics.arcade.collide(bubbles, this);
	}
}