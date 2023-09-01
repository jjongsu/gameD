import { GameObjects, Math, Physics, Scene } from 'phaser';
import Archer from '../GameObject/Archer';
import { fastBtn } from '../Component/FastBtn';
import { EnermyA } from '../GameObject/EnermyA';
import { EnermyB } from '../GameObject/EnermyB';
import { config } from '../Config/Config';
import { HPGauge } from '../Component/HPGauge';

export default class Main extends Scene {
    config?: config;
    archerGroup?: Archer[];
    attackBtn?: GameObjects.Image;
    fastBtn?: fastBtn;
    castle?: Physics.Arcade.Image;
    enermyAGroup: EnermyA[] = [];
    enermyBGroup: EnermyB[] = [];
    HPGauge?: HPGauge;

    constructor() {
        super({ key: 'main' });
    }

    create() {
        this.config = new config({ scene: this });

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.castle = this.physics.add.image(310, 300, 'castle');

        const archer1 = new Archer(this, { x: 40, y: 330 });
        const archer2 = new Archer(this, { x: 40, y: 370 });
        const archer3 = new Archer(this, { x: 40, y: 410 });
        const archer4 = new Archer(this, { x: 40, y: 450 });
        const archer5 = new Archer(this, { x: 80, y: 340 });
        const archer6 = new Archer(this, { x: 80, y: 380 });
        const archer7 = new Archer(this, { x: 80, y: 420 });
        const archer8 = new Archer(this, { x: 80, y: 460 });
        const archer9 = new Archer(this, { x: 120, y: 330 });
        const archer10 = new Archer(this, { x: 120, y: 370 });
        const archer11 = new Archer(this, { x: 120, y: 410 });
        const archer12 = new Archer(this, { x: 120, y: 450 });
        const archer13 = new Archer(this, { x: 160, y: 340 });
        const archer14 = new Archer(this, { x: 160, y: 380 });
        const archer15 = new Archer(this, { x: 160, y: 420 });
        const archer16 = new Archer(this, { x: 160, y: 460 });

        this.archerGroup = [
            archer1,
            archer2,
            archer3,
            archer4,
            archer5,
            archer6,
            archer7,
            archer8,
            archer9,
            archer10,
            archer11,
            archer12,
            archer13,
            archer14,
            archer15,
            archer16,
        ];

        this.fastBtn = new fastBtn(this, { x: 800, y: 30 }, 1);

        this.time.addEvent({
            delay: 2000,
            repeat: -1,
            callback: () => {
                this.enermyBGroup = [...this.enermyBGroup, new EnermyB(this, { y: Math.Between(300, 360) }, this.config?.fastLevel!)];
            },
        });

        // this.time.addEvent({
        //     delay: 2000,
        //     repeat: -1,
        //     callback: () => {
        //         new EnermyA(this, { y: Math.Between(300, 360) });
        //     },
        // });

        this.input.on('dragstart', (_pointer: any, gameObject: Phaser.GameObjects.GameObject) => {
            if (gameObject.getData('who') === 'enermy') this.children.bringToTop(gameObject);
        });

        this.input.on('drag', (_pointer: any, gameObject: any, dragX: number) => {
            if (gameObject.getData('who') === 'enermy') gameObject.x = dragX;
        });

        this.HPGauge = new HPGauge(this);

        this.attackBtn = this.add.image(880, 480, 'btnBattle');

        this.attackBtn.setInteractive().on('pointerdown', () => {
            this.archerGroup?.forEach((el) => {
                el.state === 'standing' ? el.setObjectState('attacking') : el.setObjectState('standing');
            });
        });
    }
}
