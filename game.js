const gameState = {
	score: 0
};

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "#2D3134",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			enableBody: true,
		}
	},
	scene: [StartScene, GameScene]
};

const game = new Phaser.Game(config);
