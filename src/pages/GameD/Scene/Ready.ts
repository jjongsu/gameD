import { Scene } from 'phaser';
import { communication } from '../Communication';

export default class Ready extends Scene {
    btn?: Phaser.GameObjects.Group;
    modeText?: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'ready' });

        this.readyEvent();
    }

    create() {
        this.add.image(0, 0, 'readyBackground').setOrigin(0, 0);
        const readyChain = this.add.image(this.game.canvas.width / 2, 202, 'readyChain').setVisible(false);
        const btnBackground = this.add.image(this.game.canvas.width / 2, 236, 'readyPlayButton').setVisible(false);
        const btnText = this.add
            .text(this.game.canvas.width / 2, 236, 'PLAY', { fontSize: 32 })
            .setOrigin(0.5, 0.5)
            .setVisible(false);

        const readyTitle = this.add
            .image(this.game.canvas.width / 2, 162, 'preloadTitle')
            .setAlpha(0.5)
            .setScale(2);

        const timeline = this.add.timeline([
            {
                at: 0,
                tween: {
                    targets: readyTitle,
                    alpha: 1,
                    scale: 1,
                    duration: 200,
                },
            },
            {
                at: 300,
                tween: {
                    targets: [readyChain, btnBackground, btnText],
                    y: '+=100',
                    duration: 200,
                    onStart: (_tween, targets) => {
                        targets.forEach((target: Phaser.GameObjects.Image | Phaser.GameObjects.Text) => target.setVisible(true));
                    },
                },
            },
        ]);
        timeline.play();

        btnBackground.setInteractive().on('pointerover', () => {
            btnBackground.setScale(1.03);
            btnText.setScale(1.03);
        });

        btnBackground.setInteractive().on('pointerout', () => {
            btnBackground.setScale(1);
            btnText.setScale(1);
        });

        btnBackground.setInteractive().on('pointerdown', () => {
            this.next();
        });

        this.drawText(communication.isConnect);
    }

    drawText(isConnect: boolean) {
        this.modeText?.destroy(true);
        const _text = `MODE : ${isConnect ? 'P2P' : 'AI'}`;
        this.modeText = this.add.text(this.game.canvas.width - 20, 20, _text, { color: 'black' }).setOrigin(1, 0);
    }

    readyEvent() {
        // communication.on('ready:complete', () => {
        //     this.scene.stop('ready');
        //     this.scene.launch('main');
        // });

        communication.on('ready:text', (data) => {
            this.drawText(data.isConnect);
        });

        communication.on('data', (data) => {
            if (data.type === 'ready:complete') {
                this._goMain();
            }

            if (data.type === 'ready') {
                if (!communication.isConnect) {
                    communication.emit('data', { type: 'ready:complete' });
                    communication.readyYou = true;
                    communication.readyMe = true;
                    this.time.delayedCall(3000, this._goMain);
                } else {
                    communication.socket.emit('data', { type: 'ready:other' });
                }
            }
        });
    }

    private _goMain() {
        this.scene.stop('ready');
        this.scene.launch('main');
    }

    private next() {
        communication.emit('data', { type: 'ready' });
    }
}
