import { Scene } from 'phaser';
import { ResumeBtn } from '../Component/ResumeBtn';

export default class PauseScene extends Scene {
    constructor() {
        super({ key: 'pause' });
    }

    create() {
        new ResumeBtn(this);
        this.add.rectangle(0, 0, this.game.canvas.width, this.game.canvas.height, 0xffffff, 0.2).setOrigin(0, 0);
    }
}
