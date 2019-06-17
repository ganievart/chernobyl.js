class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.spritesheet('doctor', '../assets/doctor.png', { frameWidth: 32, frameHeight: 31 });
	}

	create() {
		gameState.active = true;

		gameState.player = this.physics.add.sprite(50, 500, 'doctor').setScale(5);
		gameState.cursors = this.input.keyboard.createCursorKeys();

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('doctor', { start: 0, end: 5 }),
			frameRate: 5,
			repeat: -1
		});
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
		}
	}
}
