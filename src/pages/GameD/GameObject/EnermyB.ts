import { Physics } from 'phaser';
import Main from '../Scene/Main';

export class EnermyB extends Physics.Arcade.Sprite {
    x;
    y;
    enermy: Physics.Arcade.Sprite;
    scene: Main;
    damage;

    constructor(scene: Main, position: { x?: number; y: number }, initFast: number, damage?: number) {
        const { x = scene.game.canvas.width, y } = position;
        super(scene, x, y, 'enermyBWalk');
        this.x = x;
        this.y = y;
        this.scene = scene;

        this._createAnimation();

        this.enermy = this.scene.physics.add
            .sprite(x, y, 'enermyBWalk')
            .setScale(0.6)
            .setDepth(y - 299)
            .setFlipX(true)
            .setData('who', 'enermy');

        this.enermy.anims.timeScale = initFast;

        this.enermy.setVelocityX(-50).anims.play('enermyBWalk');

        this.damage = damage ?? 100;

        this.collider();
        this._makeEvent();
    }

    private collider() {
        if (!this.scene.castle) return;
        const _colliderEvent = this.scene.physics.add.collider(this.enermy, this.scene.castle, () => {
            this.enermy.setVelocityX(0);
            this.scene.castle?.setVelocityX(0);
            this.enermy.setScale(1).anims.play('enermyBJump');

            this.scene.config?.emit('attack:gauge', this.damage);

            this.enermy.removeInteractive();
            this.emit('jumpOut');
            this.scene.physics.world.removeCollider(_colliderEvent);
        });

        this.enermy.setInteractive({ draggable: true });
    }

    private _createAnimation() {
        if (this.scene.anims.exists('enermyBJump')) return;

        this.scene.anims.create({
            key: 'enermyBWalk',
            frames: this.scene.anims.generateFrameNumbers('enermyBWalk', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
            showOnStart: true,
            duration: 1000,
        });

        this.scene.anims.create({
            key: 'enermyBJump',
            frames: this.scene.anims.generateFrameNumbers('enermyBJump', { start: 0, end: 5 }),
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

        super.on('jumpOut', () => {
            this.scene.tweens.add({
                targets: this.enermy,
                y: '-=100',
                alpha: 0,
                delay: 500,
                ease: 'Power1',
                duration: 500,
                onComplete: () => this.enermy.destroy(),
            });
        });
    }
}
