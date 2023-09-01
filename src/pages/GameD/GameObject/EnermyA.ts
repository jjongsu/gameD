import { Physics } from 'phaser';
import Main from '../Scene/Main';

export class EnermyA extends Physics.Arcade.Sprite {
    x;
    y;
    enermy: Physics.Arcade.Sprite;
    scene: Main;

    constructor(scene: Main, position: { x?: number; y: number }) {
        const { x = scene.game.canvas.width, y } = position;
        super(scene, x, y, 'enermyA');
        this.x = x;
        this.y = y;
        this.scene = scene;

        this._createAnimation();

        this.enermy = this.scene.physics.add
            .sprite(x, y, 'enermyA')
            .setScale(0.6)
            .setDepth(y - 299)
            .setData('who', 'enermy');

        this.enermy.setVelocityX(-50).anims.play('enermyAWalk');

        this._collider();
        this._makeEvent();
    }

    private _collider() {
        if (!this.scene.castle) return;
        this.scene.physics.add.collider(this.enermy, this.scene.castle, () => {
            this.enermy.setVelocityX(0);
            this.scene.castle?.setVelocityX(0);
        });

        this.enermy.setInteractive({ draggable: true });
    }

    private _createAnimation() {
        if (this.scene.anims.exists('enermyAWalk')) return;

        this.scene.anims.create({
            key: 'enermyAWalk',
            frames: this.scene.anims.generateFrameNumbers('enermyA', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1,
            showOnStart: true,
            duration: 1000,
        });
    }

    private _makeEvent() {
        this.enermy.on('fast:1', () => {
            this.enermy.anims.timeScale = 1;
        });

        this.enermy.on('fast:2', () => {
            this.enermy.anims.timeScale = 2;
        });
    }
}
