import { GameObjects, Physics } from 'phaser';
import Main from '../Scene/Main';

export class config extends GameObjects.GameObject {
    fastLevel;
    maxHp;
    hp;
    scene: Main;

    constructor({ scene, fastLevel, hp }: { scene: Main; fastLevel?: number; hp?: number }) {
        super(scene, 'config');
        this.scene = scene;
        this.fastLevel = fastLevel ?? 1;
        this.maxHp = hp ?? 1000;
        this.hp = hp ?? 1000;

        this._makeEvent();
    }

    private _makeEvent() {
        super.on('attack:gauge', (value: number) => {
            this.hp -= value;
            if (this.hp <= 0) {
                this.scene.scene.stop('main');
                this.scene.scene.launch('end');
            }
            this.scene.HPGauge?.emit('set:gauge');
        });

        super.on('setting:fast', (value: 1 | 2) => {
            this.scene.tweens.setGlobalTimeScale(value);
            this.scene.physics.world.timeScale = 1 / value;
            this.scene.time.timeScale = value;

            this.fastLevel = value;
            this.scene.children.each((child) => {
                if (child instanceof Physics.Arcade.Sprite) child.emit('fast:' + value);
            });
        });
    }
}
