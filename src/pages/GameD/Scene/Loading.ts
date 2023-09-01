import { Scene } from 'phaser';
import { loadingBlack, loadingBox, loadingFill, preloadBackground, preloadTitle } from '../../../assets/gameD/image/background';

export default class Loading extends Scene {
    btn?: Phaser.GameObjects.Group;
    constructor() {
        super({ key: 'loading' });
    }

    preload() {
        this.load.image('preloadBackground', preloadBackground);
        this.load.image('loadingBox', loadingBox);
        this.load.image('loadingBlack', loadingBlack);
        this.load.image('loadingFill', loadingFill);
        this.load.image('preloadTitle', preloadTitle);

        this.load.on('complete', () => this.next());
    }

    private next() {
        this.scene.stop('loading');
        this.scene.launch('preload');
    }
}
