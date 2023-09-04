import { Scene } from 'phaser';
import PauseBtn from './PauseBtn';

export class PauseStateBtn extends PauseBtn {
    constructor(scene: Scene) {
        super(scene, {});

        this.btn.setTexture('btnPlay');
    }

    controlWold() {
        this.scene.scene.stop();
        this.scene.scene.resume('main');
    }
}
