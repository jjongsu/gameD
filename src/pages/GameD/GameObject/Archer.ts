import { GameObjects, Scene } from 'phaser';

export default class Archer extends GameObjects.GameObject {
    position;
    state;

    archerShadow?: GameObjects.Image;
    archerFootA?: GameObjects.Image;
    archerFootB?: GameObjects.Image;
    archerBody?: GameObjects.Image;
    archerHead?: GameObjects.Image;
    archerHandA?: GameObjects.Image;
    archerHandB?: GameObjects.Image;

    readonly layer = {
        background: -100,
        character0: 0,
        character1: 5,
        character2: 10,
    } as const;

    standingTimeline?: Phaser.Time.Timeline;
    attackingTimeline?: Phaser.Time.Timeline;

    constructor(scene: Scene, position: { x: number; y: number }) {
        const type = 'character';
        super(scene, type);

        this.position = position;

        this.state = 'attacking';
        this._create();
        this._makeTimeline();
        this._makeEvents();
    }

    private _create() {
        this.archerShadow = this.scene.add
            .image(this.position.x, this.position.y + 20, 'archerShadow')
            .setScale(0.7)
            .setAngle(90)
            .setDepth(this.layer['character0']);
        this.archerFootA = this.scene.add
            .image(this.position.x - 5, this.position.y + 15, 'archerFoot')
            .setScale(0.75)
            .setAngle(95)
            .setDepth(this.layer['character0']);
        this.archerFootB = this.scene.add
            .image(this.position.x + 5, this.position.y + 15, 'archerFoot')
            .setScale(0.65)
            .setAngle(100)
            .setDepth(this.layer['character0']);
        this.archerBody = this.scene.add
            .image(this.position.x, this.position.y - 1, 'archerBody')
            .setAngle(90)
            .setDepth(this.layer['character1']);
        this.archerHead = this.scene.add
            .image(this.position.x + 1, this.position.y - 26, 'archerHead')
            .setScale(0.75)
            .setAngle(90)
            .setDepth(this.layer['character1']);

        this.archerHandA = this.scene.add
            .image(this.position.x - 10, this.position.y - 3, 'archerHandA')
            .setScale(0.7)
            .setAngle(90)
            .setDepth(this.layer['character1']);
        this.archerHandB = this.scene.add
            .image(this.position.x + 15, this.position.y, 'archerHandB')
            .setScale(0.8)
            .setAngle(90)
            .setDepth(this.layer['character0']);
    }

    // private _destroy() {
    //     this.archerShadow?.destroy(true);
    //     this.archerFootA?.destroy(true);
    //     this.archerFootB?.destroy(true);
    //     this.archerBody?.destroy(true);
    //     this.archerHead?.destroy(true);
    //     this.archerHandA?.destroy(true);
    //     this.archerHandB?.destroy(true);
    // }

    // private _reset() {
    //     this.archerShadow
    //         ?.setPosition(this.position.x, this.position.y + 20)
    //         .setScale(0.7)
    //         .setAngle(90);
    //     this.archerFootA
    //         ?.setPosition(this.position.x - 5, this.position.y + 15)
    //         .setScale(0.75)
    //         .setAngle(95);
    //     this.archerFootB
    //         ?.setPosition(this.position.x + 5, this.position.y + 15)
    //         .setScale(0.65)
    //         .setAngle(100);
    //     this.archerBody?.setPosition(this.position.x, this.position.y - 1).setAngle(90);
    //     this.archerHead
    //         ?.setPosition(this.position.x + 1, this.position.y - 26)
    //         .setScale(0.75)
    //         .setAngle(90);
    //     this.archerHandA
    //         ?.setPosition(this.position.x - 10, this.position.y - 3)
    //         .setScale(0.7)
    //         .setAngle(90);
    //     this.archerHandB
    //         ?.setPosition(this.position.x + 15, this.position.y)
    //         .setScale(0.8)
    //         .setAngle(90);
    // }

    private _makeTimeline() {
        this.standingTimeline = this.scene.add.timeline([
            {
                at: 0,
                tween: {
                    targets: this.archerHead,
                    angle: 95,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                },
            },
            {
                at: 0,
                tween: {
                    targets: [this.archerBody, this.archerHead, this.archerHandA, this.archerHandB],
                    y: '+=1',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: [this.archerHandA, this.archerHandB],
                    angle: '-=5',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
        ]);

        this.attackingTimeline = this.scene.add.timeline([
            {
                at: 0,
                tween: {
                    targets: [this.archerHead, this.archerBody],
                    angle: '-=10',
                    x: '-=2',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: this.archerHead,
                    x: '-=5',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: this.archerFootA,
                    x: '-=1',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: this.archerHandB,
                    y: '-=18',
                    x: '-=3',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: [this.archerHandB, this.archerHandA],
                    angle: '-=120',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 0,
                tween: {
                    targets: this.archerHandA,
                    x: '+=3',
                    y: '-=5',
                    yoyo: true,
                    repeat: -1,
                    duration: 500,
                },
            },
            {
                at: 200,
                tween: {
                    targets: this.archerHandA,
                    scaleX: 0.5,
                    repeat: -1,
                    yoyo: true,
                    duration: 200,
                    hold: 400,
                    repeatDelay: 200,
                },
            },
        ]);
    }

    private _makeEvents() {
        this.on('state:standing', () => {
            this.attackingTimeline?.stop();
            this.standingTimeline?.reset();
        });
        this.on('state:attacking', () => {
            this.standingTimeline?.stop();
            this.attackingTimeline?.reset();
        });

        this.emit(`state:${this.state}`);
    }

    setObjectState(value: 'standing' | 'attacking') {
        this.setState(value);
        this.emit(`state:${value}`);
    }
}
