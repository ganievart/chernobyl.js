// Paste in ONLY the StartScene class below:
class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	create() {
		this.add.text(250, 250, 'Click to Start! TEST', {
			fontSize: '30px',
			color: '#FDFEFE'
		});
		this.input.on('pointerdown', () => {
			this.scene.stop('StarScene')
			this.scene.start('GameScene')
		})
	}
}
