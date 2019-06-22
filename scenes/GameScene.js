class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.image('platform', '../assets/industrial/layers/platform_ind.png');
		this.load.spritesheet('doctor', '../assets/doctor.png', { frameWidth: 32, frameHeight: 31 });
		this.load.image('bg1', '../assets/industrial/layers/buildings.png');
		this.load.image('bg2', '../assets/industrial/layers/green.png');
		this.load.image('bg3', '../assets/industrial/layers/background.png');
	}

	create() {
		gameState.active = true;

		gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x348958).setOrigin(0, 0);

		this.createParallaxBackgrounds();

		// this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
		// this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);

		// this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)


		gameState.player = this.physics.add.sprite(50, 500, 'doctor').setScale(1.5);
		gameState.cursors = this.input.keyboard.createCursorKeys();

		const platforms = this.physics.add.staticGroup();
		const platPositions = [
			{ x: 50, y: 675 }, { x: 250, y: 675 }, { x: 450, y: 675 },
		];

		platPositions.forEach(plat => {
			platforms.create(plat.x, plat.y, 'platform')
		});

		this.physics.add.collider(gameState.player, platforms);

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('doctor', { start: 0, end: 5 }),
			frameRate: 5,
			repeat: -1
		});

	}

	createParallaxBackgrounds() {
		// gameState.bg1 = this.add.image(0, 0, 'bg1').setScale(2);
		// gameState.bg2 = this.add.image(0, 0, 'bg2').setScale(3);
		gameState.bg3 = this.add.image(0, 0, 'bg3').setScale(3);

		// gameState.bg1.setOrigin(0, 0);
		// gameState.bg2.setOrigin(0, 0);
		gameState.bg3.setOrigin(0, 0);
	}

	update() {
		if (gameState.active) {
			if (gameState.cursors.right.isDown) {
				gameState.player.setVelocityX(350);
				gameState.player.anims.play('run', true);
				gameState.player.flipX = false;
			} else if (gameState.cursors.left.isDown) {
				gameState.player.setVelocityX(-350);
				gameState.player.anims.play('run', true);
				gameState.player.flipX = true;
			} else {
				gameState.player.anims.play('run', false);
				gameState.player.setVelocityX(0);
			}
			if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
				gameState.player.anims.play('run', true);
				gameState.player.setVelocityY(-600);
			}
		}
	}
}
