import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
	constructor()
	{
		super('game');
	}

	preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');

    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });

    this.fauna = this.physics.add.sprite(105, 100, 'fauna', 'sprites/run-down/run-down-1.png');
    this.fauna.body.setSize(this.fauna.width * 0.5, this.fauna.height * 0.5);

    this.anims.create({
      key: 'fauna-idle-down',
      frames: [ { key: 'fauna', frame: 'sprites/walk-down/walk-down-3.png' }]
    });

    this.anims.create({
      key: 'fauna-idle-up',
      frames: [ { key: 'fauna', frame: 'sprites/walk-up/walk-up-3.png' }]
    });

    this.anims.create({
      key: 'fauna-idle-side',
      frames: [ { key: 'fauna', frame: 'sprites/walk-side/walk-side-3.png' }]
    });

    this.anims.create({
      key: 'fauna-run-down',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'sprites/run-down/run-down-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    });

    this.anims.create({
      key: 'fauna-run-up',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'sprites/run-up/run-up-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    });

    this.anims.create({
      key: 'fauna-run-side',
      frames: this.anims.generateFrameNames('fauna', { start: 1, end: 8, prefix: 'sprites/run-side/run-side-', suffix: '.png' }),
      repeat: -1,
      frameRate: 10
    });

    this.physics.add.collider(this.fauna, wallsLayer);
  }

  update(t, dt) {
    if (!this.cursors || !this.fauna) {
      console.log('Out');
      return;
    }

    const speed = 100;

    if (this.cursors.left.isDown) {
      this.fauna.anims.play('fauna-run-side', true);
      this.fauna.setVelocity(-speed, 0);
      this.fauna.scaleX = -1;
      this.fauna.body.offset.x = 24;
    } else if (this.cursors.right.isDown) {
      this.fauna.anims.play('fauna-run-side', true);
      this.fauna.setVelocity(speed, 0);
      this.fauna.scaleX = 1;
      this.fauna.body.offset.x = 8;
    } else if (this.cursors.up.isDown) {
      this.fauna.anims.play('fauna-run-up', true);
      this.fauna.setVelocity(0, -speed);
    } else if (this.cursors.down.isDown) {
      this.fauna.anims.play('fauna-run-down', true);
      this.fauna.setVelocity(0, speed);
    } else {
      this.fauna.setVelocity(0, 0);
    }
  }
}
