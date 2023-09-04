import { GameObjects, Scene } from 'phaser';

export default class PauseBtn extends GameObjects.GameObject {
    btn;

    constructor(scene: Scene, position: { x?: number; y?: number }) {
        const { x = 920, y = 40 } = position;
        super(scene, 'btnPause');

        this.btn = scene.add.image(x, y, 'btnPause');

        this._elementEvents();
        this._interaction();
    }

    private _elementEvents() {
        this.on('scale:up', () => {
            this.btn.setScale(1.05);
        });

        this.on('scale:down', () => {
            this.btn.setScale(1);
        });
    }

    private _interaction() {
        this.btn.setInteractive().on('pointerover', () => {
            this.emit('scale:up');
        });
        this.btn.setInteractive().on('pointerout', () => {
            this.emit('scale:down');
        });
        this.btn.setInteractive().on('pointerdown', () => {
            this.controlWold();
        });
    }

    controlWold() {
        this.btn.setVisible(false);
        this.scene.scene.pause();
        this.scene.scene.launch('pause');
    }
}
