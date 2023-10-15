
// You can write more code here

/* START OF COMPILED CODE */

class Box extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "crate_06", frame);
		
		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.static = true;
		thisPhysics.height = 32;
		thisPhysics.offsetY = 32;
		new DepthSortY(this);
		new ItemHolder(this);
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
