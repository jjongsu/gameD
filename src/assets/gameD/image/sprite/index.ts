import sprites1 from './enermyA.png';
import sprites2 from './enermyBJump.png';
import sprites3 from './enermyBWalk.png';

type TImages = 'enermyA' | 'enermyBJump' | 'enermyBWalk';
type TSprites = { [key in TImages]?: { src: string; frame: Phaser.Types.Loader.FileTypes.ImageFrameConfig } };

const sprites: TSprites = {
    enermyA: { src: sprites1, frame: { frameWidth: 144.25, frameHeight: 216.5 } },
    enermyBJump: { src: sprites2, frame: { frameWidth: 80, frameHeight: 165 } },
    enermyBWalk: { src: sprites3, frame: { frameWidth: 150, frameHeight: 249 } },
};

export const { enermyA, enermyBJump, enermyBWalk } = sprites;
