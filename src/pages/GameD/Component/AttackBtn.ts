import { GameObjects } from 'phaser';
import Main from '../Scene/Main';

export default class AttackBtn extends GameObjects.GameObject {
    scene: Main;
    btn;

    constructor(scene: Main, position: { x?: number; y?: number }) {
        const { x = 880, y = 480 } = position;
        super(scene, 'btnBattle');

        this.scene = scene;

        this.btn = scene.add.image(x, y, 'btnBattle');

        this._createEvent();
    }

    private _createEvent() {
        this.btn.setInteractive().on('pointerdown', () => {
            this.scene.archerGroup?.forEach((el) => {
                el.state === 'standing' ? el.setObjectState('attacking') : el.setObjectState('standing');
            });
        });
    }
}
