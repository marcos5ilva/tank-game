import Phaser from 'phaser';

import SceneMain from './scenes/SceneMain';
import SceneTitle from './scenes/SceneTitle';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 480,
	height: 640,
	parent: 'phaser-game',
	scene: [SceneTitle, SceneMain]
}

export default new Phaser.Game(config)
