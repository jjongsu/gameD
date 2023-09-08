import EventEmitter from 'eventemitter3';
import { communication } from '..';

const ai = new EventEmitter();

ai.on('data', (data) => {
    console.log(data);
    if (data.type === 'ready') {
        communication.emit('data', { type: 'ready:complete' });
    }
});

export default ai;
