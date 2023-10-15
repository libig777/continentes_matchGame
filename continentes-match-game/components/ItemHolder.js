
// You can write more code here

/* START OF COMPILED CODE */

class ItemHolder {
	
	constructor(gameObject) {
		gameObject["__ItemHolder"] = this;
		
		/** @type {Phaser.GameObjects.Image} */
		this.gameObject = gameObject;
		/** @type {string} */
		this.itemName = "bear";
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/**
		 * @type {Phaser.GameObjects.Image}
		 */
		this.display= undefined
		/* END-USER-CTR-CODE */
	}
	
	/** @returns {ItemHolder} */
	static getComponent(gameObject) {
		return gameObject["__ItemHolder"];
	}
	
	/* START-USER-CODE */
	get isReaveled(){
		return this.display && this.display.visible
	}

	setTint(tint){
		if (!this.display){
			return
		}
		this.display.setTint(tint)
	}

	// Write your code here.
	/**
	 * @param {()=> void} [callback]
	*/
	reveal(callback){

		if (this.isReaveled){
			return 
		}
		const scene = this.gameObject.scene 
		const {x,y} = this.gameObject

		if (!this.display){
			this.display = scene.add.image(x, y, this.itemName)
				.setDepth(3000)
		}

		this.display.alpha = 0
		this.display.scale = 0
		this.display.visible =true 

		scene.tweens.add({
		targets: this.display,
		y: '-=50',
		alpha: 1,
		scale: 0.5,
		duration: 500,
		onComplete: ()=>{
			if (callback){
				callback()
			}
		}
		})
	}

	/**
	 * @param {()=> void} [callback]
	*/
	hide(callback){
		// hide the items and set box to no longer opened
		const scene = this.gameObject.scene 
		scene.tweens.add({
			targets: this.display,
			y: '+=50',
			alpha: 0,
			scale: 0,
			duration: 300,
			delay: 1000,
			onComplete: () => {
				this.display.visible= false
				
				if (callback){
					callback()
				}
			}
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
