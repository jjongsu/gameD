import { useEffect, useRef } from 'react';
import Main from './Scene/Main';
import Preload from './Scene/Preload';
import Ready from './Scene/Ready';
import Loading from './Scene/Loading';
import End from './Scene/End';
import PauseScene from './Scene/PauseScene';

export default function GameD() {
    const ref = useRef<HTMLDivElement>(null);
    const game = useRef<Phaser.Game>();

    useEffect(() => {
        if (game.current || !ref.current) return;

        game.current = new Phaser.Game({
            width: 960,
            height: 540,
            type: Phaser.AUTO,
            physics: { default: 'arcade' },
            parent: 'phaser-container',
            scene: [new Loading(), new Preload(), new Ready(), new Main(), new PauseScene(), new End()],
        });
    }, []);
    return (
        <div className='flex justify-center items-center overflow-hidden inset-0 fixed'>
            <div
                className='w-[960px] h-[540px] flex-shrink-0 justify-center'
                ref={ref}
                id='phaser-container'
            ></div>
        </div>
    );
}
