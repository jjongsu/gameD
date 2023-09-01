import { Scene } from 'phaser';

export default class Ready extends Scene {
    btn?: Phaser.GameObjects.Group;
    constructor() {
        super({ key: 'ready' });
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
                    onStart: (tween, targets) => {
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
    }

    private next() {
        this.scene.stop('ready');
        this.scene.launch('main');
    }
}
