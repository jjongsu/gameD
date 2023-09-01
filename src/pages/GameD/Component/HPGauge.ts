import Main from '../Scene/Main';

export class HPGauge extends Phaser.GameObjects.Group {
    container;
    fill;
    hpText;
    hpNumber;
    scene: Main;
    gaugeInitWidth;

    constructor(scene: Main) {
        super(scene);
        this.scene = scene;
        const gaugePostion = { x: 300, y: 35 };

        this.container = this.scene.add.image(gaugePostion.x, gaugePostion.y, 'hpContainer').setOrigin(0, 0);
        this.fill = this.scene.add.image(gaugePostion.x + 2.5, gaugePostion.y + 2.5, 'hpFill').setOrigin(0, 0);

        this.gaugeInitWidth = this.fill.width;

        const { x: textX = gaugePostion.x - 100, y: textY = gaugePostion.y } = this.container.getLeftCenter();
        const { x: numberX = gaugePostion.x + 100, y: numberY = gaugePostion.y } = this.container.getBottomRight();

        this.hpText = this.scene.add.text(textX + 3, textY, 'HP', { strokeThickness: 2, stroke: '#000000', fontSize: '14pt' }).setOrigin(0, 0.5);

        this.hpNumber = this.scene.add
            .text(numberX - 3, numberY, scene.config.maxHp.toString(), { strokeThickness: 2, stroke: '#000000', fontSize: '12pt' })
            .setOrigin(1, 1);

        super.add(this.container);
        super.add(this.fill);
        super.add(this.hpText);
        super.add(this.hpNumber);

        this._makeEvent();
    }

    private _makeEvent() {
        super.on('set:gauge', () => {
            this.hpNumber.setText(this.scene.config.hp.toString());
            const ratioGauge = this.scene.config.hp / this.scene.config.maxHp;
            this.fill.setScale(ratioGauge, 1);
        });

        super.on('attack:gauge', (value: number) => {
            this.scene.config.hp -= value;
            super.emit('set:gauge');
        });
    }
}
