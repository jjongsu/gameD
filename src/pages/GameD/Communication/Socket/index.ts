import { io } from 'socket.io-client';
import { communication } from '..';

const URL = process.env.NODE_ENV === 'production' ? window.location : 'http://localhost:4000';

const socket = io(URL, {
    autoConnect: false,
    reconnection: false,
});

socket.on('data', (data) => {
    console.log(data);
    if (data.type === 'ready') {
        communication.readyYou = true;
        if (communication.readyMe) {
            communication.emit('data', { type: 'ready:complete', to: 'all' });
        }
    }
    if (data.type === 'ready:complete') {
        communication.readyYou = true;
        communication.emit('data', { type: 'ready:complete', to: 'me' });
    }
});

export default socket;
