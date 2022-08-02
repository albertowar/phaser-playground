import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
	constructor()
	{
		super('preloader');
	}

	preload() {
    this.load.image('tiles', 'tiles/tileset.png');
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')
  }

  create() {
    this.scene.start('game');
  }
}
