export default class End extends Phaser.Scene {
    center!: { x: number; y: number };

    constructor() {
        super({ key: 'end' });
    }

    init() {
        this.center = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 };
    }

    create() {
        this.add.image(0, 0, 'readyBackground').setOrigin(0, 0);

        const resetBtn = this.add.image(this.center.x, this.center.y - 50, 'btnExit').setScale(3);
        resetBtn.setInteractive().on('pointerover', () => {
            resetBtn.setScale(3.2);
        });
        resetBtn.setInteractive().on('pointerout', () => {
            resetBtn.setScale(3);
        });
        resetBtn.setInteractive().on('pointerdown', () => {
            location.reload();
        });

        this.add.image(this.center.x, this.center.y + 70, 'btnUpgrade');
        this.add.text(this.center.x, this.center.y + 70, 'RESET', { fontSize: '18pt' }).setOrigin(0.5, 0.5);
    }
}
