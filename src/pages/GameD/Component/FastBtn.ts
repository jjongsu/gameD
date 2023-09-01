import { GameObjects, Physics } from 'phaser';
import Main from '../Scene/Main';

export class fastBtn extends GameObjects.Image {
    btn;
    text;
    level;
    fastG;
    scene: Main;

    constructor(scene: Main, position: { x?: number; y?: number }, level: 1 | 2) {
        const texture = 'btnFast' + level;
        const { x = 800, y = 30 } = position;
        super(scene, x, y, texture);
        this.level = level;

        this.scene = scene;

        this.btn = scene.add.image(x, y, texture);
        this.text = scene.add.text(x + 10, y + 10, this.level + 'x', { strokeThickness: 2, stroke: '#000000', fontSize: '12pt' });

        this.fastG = scene.add.group([this.btn, this.text]);

        this._elementEvents();
        this._interaction();
    }

    private _elementEvents() {
        this.on('scale:up', () => {
            this.btn.setScale(1.05);
            this.text.setScale(1.05);
        });

        this.on('scale:down', () => {
            this.btn.setScale(1);
            this.text.setScale(1);
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
            this.levelChange();
        });
    }

    levelChange() {
        this.level = this.level === 1 ? 2 : 1;
        this.btn.setTexture(this._textureName(this.level));
        this.text.setText(this.level + 'x');
        this.scene.config?.emit('setting:fast', this.level);
    }

    private _textureName(level: 1 | 2) {
        const texture = 'btnFast' + level;
        return texture;
    }
}
