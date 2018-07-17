import { Component } from 'preact';
import 'phaser/dist/phaser';
import Dungeon from './dungeon';

const dungeon = new Dungeon(32, 32);

if (module.hot) {
  require('preact/debug');
}

export default class MapGenerator extends Component {
  firstRun = true;

  mountMap(onClick, warps) {
    var config = {
      type: Phaser.WEBGL,
      height: 400,
      parent: 'map-container',
      pixelArt: true,
      width: 400,
      physics: {
        default: 'impact',
        impact: { gravity: 0 }
      },
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    };

    this.game = new Phaser.Game(config);
    this.game.registry.onClick = onClick;
    this.game.registry.warps = warps;
  }

  preload () {
    this.load.image('tiles', 'assets/tilemap.png');
    this.load.spritesheet('sprites', 'assets/sprites.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('player', 'assets/kircho.png', { frameWidth: 16, frameHeight: 16 });
  }

  create () {
    this.tilemap = this.make.tilemap({ tileWidth: 32, tileHeight: 32, width: dungeon.width, height: dungeon.height });
    this.tileset = this.tilemap.addTilesetImage('tiles');
    this.layer = this.tilemap.createBlankDynamicLayer(0, this.tileset);

    for (let c =0; c< dungeon.width * dungeon.height; c++) {
      let y = Math.floor(c / dungeon.width);
      let x = (c % dungeon.width);
      let tile = dungeon.getTile(x, y);

      this.tilemap.putTileAt(tile, x, y);
    }

    for (let w=0; w < this.registry.warps.length; w++) {
      let wx = this.registry.warps[w][0] * 32;
      let wy = this.registry.warps[w][1] * 32;

      this.impact.add.sprite(wx, wy, 'sprites', 4);
    }

    let animation = {
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
      frameRate: 10,
      repeat: -1
    };

    this.anims.create(animation);
    this.anims.create({
      ...animation,
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 })
    });
    this.anims.create({
      ...animation,
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 11, end: 13 })
    });
    this.anims.create({
      ...animation,
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6 })
    });

    this.player = this.impact.add.sprite(32, 32, 'player', 1);

    this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown', function (pointer) {
      const c = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

      const cx = c.x;
      const cy = c.y;

      this.impact.add.sprite(cx, cy, 'sprites', 1);

      this.registry.onClick(Math.floor(cx /32), Math.floor(cy /32));
    }, this);
  }

  update () {
    let newX = this.player.body.pos.x,
      newY= this.player.body.pos.y;

    if (this.cursors.left.isDown) {
      newX -= 3;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      newX += 3;
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      newY -= 3;
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      newY += 3;
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }

    console.log(Math.floor(newX/32), Math.floor(newY /32), dungeon.getTile(Math.floor(newX / 32), Math.floor(newY / 32)));

    if (dungeon.getTile(Math.floor(newX / 32), Math.floor(newY / 32)) !== 163) {
      if(newX >= 0 && newX < dungeon.width * 32 && newY >= 0 && newY < dungeon.height * 32) {
        this.player.body.pos.x = newX;
        this.player.body.pos.y = newY;
      }
    }
  }

  render() {
    return (
      <div id="map-container"></div>
    );
  }

  componentDidUpdate() {
    if ( this.firstRun === true) {
      this.mountMap(this.props.onClick, this.props.warps);
      this.firstRun = false;
    }
  }

}
