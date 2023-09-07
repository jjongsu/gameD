import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? window.location : 'http://localhost:4000';

const socket = io(URL, {
    autoConnect: false,
    reconnection: false,
});

export default socket;
