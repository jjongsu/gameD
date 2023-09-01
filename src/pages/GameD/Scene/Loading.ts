import { Scene } from 'phaser';
import {
    loadingBlack,
    loadingBox,
    loadingFill,
    preloadBackground,
    preloadTitle,
    // background,
    // castle,
    // hpContainer,
    // hpFill,
    // readyBackground,
    // readyChain,
    // readyPlayButton,
} from '../../../assets/gameD/image/background';
// import { archerBody, archerFoot, archerHandA, archerHandB, archerHead, archerShadow, arrow } from '../../../assets/gameD/image/archer';
// import {
//     btnBattle,
//     btnCoin,
//     btnCoinReward,
//     btnCrystal,
//     btnExit,
//     btnFast1,
//     btnFast2,
//     btnHome,
//     btnPause,
//     btnRetry,
//     levelContainer,
//     settingIcon,
// } from '../../../assets/gameD/image/icon';

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

        // this.load.image('readyBackground', readyBackground);
        // this.load.image('readyChain', readyChain);
        // this.load.image('readyPlayButton', readyPlayButton);
        // this.load.image('background', background);
        // this.load.image('castle', castle);

        // this.load.image('arrow', arrow);
        // this.load.image('archerBody', archerBody);
        // this.load.image('archerFoot', archerFoot);
        // this.load.image('archerHandA', archerHandA);
        // this.load.image('archerHandB', archerHandB);
        // this.load.image('archerHead', archerHead);
        // this.load.image('archerShadow', archerShadow);

        // this.load.image('btnBattle', btnBattle);
        // this.load.image('btnExit', btnExit);
        // this.load.image('btnFast1', btnFast1);
        // this.load.image('btnFast2', btnFast2);
        // this.load.image('btnHome', btnHome);
        // this.load.image('btnPause', btnPause);
        // this.load.image('btnRetry', btnRetry);
        // this.load.image('btnCoinReward', btnCoinReward);
        // this.load.image('btnCoin', btnCoin);
        // this.load.image('btnCrystal', btnCrystal);
        // this.load.image('levelContainer', levelContainer);
        // this.load.image('settingIcon', settingIcon);
        // this.load.image('hpContainer', hpContainer);
        // this.load.image('hpFill', hpFill);

        this.load.on('complete', () => this.next());
    }

    private next() {
        this.scene.stop('loading');
        this.scene.launch('preload');
    }
}
