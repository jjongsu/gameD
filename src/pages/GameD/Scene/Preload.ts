import { Scene } from 'phaser';
import { background, btnUpgrade, castle, hpContainer, hpFill, readyBackground, readyChain, readyPlayButton } from '../../../assets/gameD/image/background';
import { archerBody, archerFoot, archerHandA, archerHandB, archerHead, archerShadow, arrow } from '../../../assets/gameD/image/archer';
import {
    btnBattle,
    btnCoin,
    btnCoinReward,
    btnCrystal,
    btnExit,
    btnFast1,
    btnFast2,
    btnHome,
    btnPause,
    btnPlay,
    btnRetry,
    levelContainer,
    settingIcon,
} from '../../../assets/gameD/image/icon';
import * as sprites from '../../../assets/gameD/image/sprite';

export default class Preload extends Scene {
    progressbar?: Phaser.GameObjects.Image;
    constructor() {
        super({ key: 'preload' });
    }

    init() {
        this.add.image(0, 0, 'preloadBackground').setOrigin(0, 0);
        this.add.image(700, 152, 'preloadTitle');

        this.add.image(700, 300, 'loadingBlack');
        this.progressbar = this.add.image(487, 298.5, 'loadingFill').setOrigin(0, 0.5).setScale(0, 1);
        this.add.image(700, 300, 'loadingBox');
    }

    preload() {
        this.load.image('readyBackground', readyBackground);
        this.load.image('readyChain', readyChain);
        this.load.image('readyPlayButton', readyPlayButton);
        this.load.image('background', background);
        this.load.image('castle', castle);

        this.load.image('arrow', arrow);
        this.load.image('archerBody', archerBody);
        this.load.image('archerFoot', archerFoot);
        this.load.image('archerHandA', archerHandA);
        this.load.image('archerHandB', archerHandB);
        this.load.image('archerHead', archerHead);
        this.load.image('archerShadow', archerShadow);

        this.load.image('btnBattle', btnBattle);
        this.load.image('btnExit', btnExit);
        this.load.image('btnFast1', btnFast1);
        this.load.image('btnFast2', btnFast2);
        this.load.image('btnHome', btnHome);
        this.load.image('btnPause', btnPause);
        this.load.image('btnPlay', btnPlay);
        this.load.image('btnRetry', btnRetry);
        this.load.image('btnCoinReward', btnCoinReward);
        this.load.image('btnCoin', btnCoin);
        this.load.image('btnCrystal', btnCrystal);
        this.load.image('levelContainer', levelContainer);
        this.load.image('settingIcon', settingIcon);
        this.load.image('hpContainer', hpContainer);
        this.load.image('hpFill', hpFill);
        this.load.image('btnUpgrade', btnUpgrade);

        this.load.on('progress', (value: number) => this.progressLoading(value));
        this.load.on('complete', () => this.next());

        // SPRITE
        for (const key in sprites) {
            if (Object.prototype.hasOwnProperty.call(sprites, key)) {
                const sprite = sprites[key as keyof typeof sprites];
                sprite && this.load.spritesheet(key, sprite.src, sprite.frame);
            }
        }
    }

    private progressLoading(value: number) {
        this.progressbar?.setScale(value, 1);
    }

    private next() {
        this.scene.stop('preload');
        this.scene.launch('ready');
    }
}
