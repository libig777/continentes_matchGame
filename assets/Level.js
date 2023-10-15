
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Sprite} */
		this.player;
		/** @type {Phaser.GameObjects.Text} */
		this.countdownText;
		/** @type {Box[]} */
		this.boxes;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/**
		 * @type {Box | undefined}
		 */
		this.activeBox = undefined

		/** @type {{ box: Phaser.Physics.Arcade.Sprite}[]} */
		this.selectedBoxes = []

		this.matchesCount = 0
		/* END-USER-CTR-CODE */
	}
	
	editorCreate() {
		
		// player
		const player = this.add.sprite(512, 256, "player_23");
		
		// box
		const box = new Box(this, 96, 144);
		this.add.existing(box);
		
		// box_1
		const box_1 = new Box(this, 688, 112);
		this.add.existing(box_1);
		
		// box_2
		const box_2 = new Box(this, 256, 256);
		this.add.existing(box_2);
		
		// box_3
		const box_3 = new Box(this, 672, 304);
		this.add.existing(box_3);
		
		// box_4
		const box_4 = new Box(this, 416, 368);
		this.add.existing(box_4);
		
		// box_5
		const box_5 = new Box(this, 110, 530);
		this.add.existing(box_5);
		
		// box_6
		const box_6 = new Box(this, 400, 528);
		this.add.existing(box_6);
		
		// box_7
		const box_7 = new Box(this, 672, 528);
		this.add.existing(box_7);
		
		// box_8
		const box_8 = new Box(this, 448, 160);
		this.add.existing(box_8);
		
		// countdownText
		const countdownText = this.add.text(384, 32, "", {});
		countdownText.setOrigin(0.5, 0.5);
		countdownText.text = "45";
		countdownText.setStyle({"fontSize":"48px"});
		
		// box_9
		const box_9 = new Box(this, 86, 289);
		this.add.existing(box_9);
		
		// box_10
		const box_10 = new Box(this, 256, 112);
		this.add.existing(box_10);
		
		// box_11
		const box_11 = new Box(this, 222, 419);
		this.add.existing(box_11);
		
		// box_12
		const box_12 = new Box(this, 544, 448);
		this.add.existing(box_12);
		
		// lists
		const boxes = [box, box_7, box_3, box_6, box_4, box_2, box_5, box_8, box_1, box_9, box_10, box_11, box_12]
		
		// player (components)
		const playerPhysics = new Physics(player);
		playerPhysics.width = 40;
		playerPhysics.height = 16;
		playerPhysics.offsetX = 12;
		playerPhysics.offsetY = 38;
		new Movement(player);
		new DepthSortY(player);
		new Action(player);
		
		// box (components)
		const boxItemHolder = ItemHolder.getComponent(box);
		boxItemHolder.itemName = "america";
		
		// box_1 (components)
		const box_1ItemHolder = ItemHolder.getComponent(box_1);
		box_1ItemHolder.itemName = "asia";
		
		// box_2 (components)
		const box_2ItemHolder = ItemHolder.getComponent(box_2);
		box_2ItemHolder.itemName = "europa02";
		
		// box_3 (components)
		const box_3ItemHolder = ItemHolder.getComponent(box_3);
		box_3ItemHolder.itemName = "africa02";
		
		// box_4 (components)
		const box_4ItemHolder = ItemHolder.getComponent(box_4);
		box_4ItemHolder.itemName = "europa";
		
		// box_5 (components)
		const box_5ItemHolder = ItemHolder.getComponent(box_5);
		box_5ItemHolder.itemName = "america02";
		
		// box_6 (components)
		const box_6ItemHolder = ItemHolder.getComponent(box_6);
		box_6ItemHolder.itemName = "africa";
		
		// box_7 (components)
		const box_7ItemHolder = ItemHolder.getComponent(box_7);
		box_7ItemHolder.itemName = "asia02";
		
		// countdownText (components)
		new Countdown(countdownText);
		
		// box_9 (components)
		const box_9ItemHolder = ItemHolder.getComponent(box_9);
		box_9ItemHolder.itemName = "oceania";
		
		// box_10 (components)
		const box_10ItemHolder = ItemHolder.getComponent(box_10);
		box_10ItemHolder.itemName = "oceania02";
		
		// box_11 (components)
		const box_11ItemHolder = ItemHolder.getComponent(box_11);
		box_11ItemHolder.itemName = "antartida";
		
		// box_12 (components)
		const box_12ItemHolder = ItemHolder.getComponent(box_12);
		box_12ItemHolder.itemName = "antartida02";
		
		this.player = player;
		this.countdownText = countdownText;
		this.boxes = boxes;
	}
	
	/* START-USER-CODE */

	// Write your code here.
	create(){
		this.editorCreate()
		this.player.play('down-walk')
		this.physics.add.collider(this.player,this.boxes, this.handlePlayerBoxCollide, undefined, this)

		this.events.on('open-box', this.handleOpenBox, this)

		Countdown.getComponent(this.countdownText).start(this.handleCountdownFinished.bind(this),30000)
	}

	handleCountdownFinished()
	{
		// disable player like we've done before
		this.player.active = false
		/** @type {Phaser.Physics.Arcade.Body} */
		const body = this.player.body
		body.setVelocity(0, 0)

		// create a You Lose! message
		const { width, height } = this.scale
		this.add.text(width * 0.5, height * 0.5, 'Inténtalo de nuevo!', { fontSize: 48 })
			.setOrigin(0.5)
			.setDepth(5000)
	}
	/**
	 * 
	 * @param {Phaser.GameObjects.Sprite} player
	 * @param {Box} box
	 */
	handlePlayerBoxCollide (player, box){

		const itemHolder = 	ItemHolder.getComponent(box)
		if (itemHolder && itemHolder.isReaveled){
			return 
		}

		if (this.activeBox)
		{
			return
		}

		this.activeBox = box

		this.activeBox.setTexture('crate_05')

	}

	handleOpenBox(){

		if (!this.activeBox)
		{
			return
		}
		const itemHolder = ItemHolder.getComponent(this.activeBox)

		if (!itemHolder){
			return
		}

		if (itemHolder.isReaveled){
			return 
		}

		this.selectedBoxes.push({
			box: this.activeBox			
		})

		itemHolder.reveal(()=>{

			if (itemHolder.itemName === 'bear'){
				this.handleBearSelected()
				return 
			}
			// check that we have 2️⃣ items recently opened
			if (this.selectedBoxes.length < 2)
			{
				return
			}

			// we have to create this method
			this.checkForMatch()
		})

	}

	handleBearSelected()
	{
		// get the selected box information
		const { box } = this.selectedBoxes.pop()

		const itemHolder = ItemHolder.getComponent(box)

		// tint the bear red
		itemHolder.setTint(0xff0000)

		// set the box to frame 7 (a red box)
		box.setTexture('crate_03')

		// disable the player and any movement
		this.player.active = false

		/** @type {Phaser.Physics.Arcade.Body} */
		const body = this.player.body
		body.setVelocity(0, 0)

		// wait 1 second and then return to normal
		this.time.delayedCall(1000, () => {
			itemHolder.hide(() =>{
				itemHolder.setTint(0xffffff)
				box.setTexture('crate_06')
				this.player.active = true // 👈 re-activate the player
			})	
		})
	}

	checkForMatch()
	{
		// pop from end to get second and first opened boxes
		const second = this.selectedBoxes.pop()
		const first = this.selectedBoxes.pop()

		const firstHolder= ItemHolder.getComponent(first.box)
		const secondHolder = ItemHolder.getComponent(second.box)
		
		const len01 = firstHolder.itemName.length
		const len02 = secondHolder.itemName.length
		const itemNombre01 = firstHolder.itemName
		const itemNombre02 = secondHolder.itemName
		let parteNombre01 = undefined
		let parteNombre02 = undefined

		if (len01>len02){
			parteNombre01=itemNombre01.slice(0, len02)
			parteNombre02 = itemNombre02
		}
		else{
			parteNombre01 = itemNombre01
			parteNombre02=itemNombre02.slice(0, len01)
		}

		//const nombre02 = secondHolder.itemName
		// no match if the revealed items are not the same texture
		if (parteNombre01 !== parteNombre02)
		{
			firstHolder.hide()
			secondHolder.hide()
			return
		}

		++this.matchesCount

		// we have a match! wait 1 second then set box to frame 8
		this.time.delayedCall(1000, () => {
			first.box.setTexture('crate_04')
			second.box.setTexture('crate_04')

				// 👇 check that we have 4 matches
			if (this.matchesCount >= 6)
			{
				// game won
				Countdown.getComponent(this.countdownText).stop()

				// 👇 disable and stop player like before
				this.player.active = false

				/** @type {Phaser.Physics.Arcade.Body} */
				const body = this.player.body 
				body.setVelocity(0, 0)

				// add a You Win! text 👇
				const { width, height } = this.scale
				this.add.text(width * 0.5, height * 0.5, '¡Ganaste!', {
					fontSize: 48
				})
				.setOrigin(0.5)
				.setDepth(5000)
			}
		})
	}

	updateActiveBox(){
		if (!this.activeBox)
		{
			return
		}

		// get the distance here 👇
		const distance = Phaser.Math.Distance.Between(
			this.player.x, this.player.y,
			this.activeBox.x, this.activeBox.y
		)

		if (distance < 64) // 👈 do nothing if still near
		{
			return
		}

		// return to using frame 10 when too far
		this.activeBox.setTexture('crate_06')

		// and make activeBox undefined
		this.activeBox = undefined
	}

	update(){
		// previous code...
		this.updateActiveBox()

		this.children.each(c => {
		/** @type {Phaser.Physics.Arcade.Sprite} */
		// @ts-ignore
		const child = c

		if (!DepthSortY.getComponent(child)){
			return
		}

		child.setDepth(child.y)
	})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
