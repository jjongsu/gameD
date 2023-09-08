import EventEmitter from 'eventemitter3';
import socket from './Socket';
import ai from './AI';

export type TRTCPeerOptions = { room?: string; config?: RTCConfiguration };
export type TEventNames = 'ready' | 'data' | 'connected' | 'disconnected' | 'ready:complete' | 'ready:text';
export default class Communication extends EventEmitter<TEventNames> {
    socket;
    ai;
    isConnect = false;
    otherId = '';
    readyMe = false;
    readyYou = false;
    isHost = true;

    constructor() {
        super();

        this.socket = socket;
        this.ai = ai;
        this._makeEvent();
    }

    private _makeEvent() {
        this.on('connected', (data) => {
            this.otherId = data.id;
            this.isConnect = true;
            this.emit('ready:text', { isConnect: true });
        });

        this.on('disconnected', () => {
            this.otherId = '';
            this.isHost = true;
            this.isConnect = false;
            this.socket.disconnect();
            this.emit('ready:text', { isConnect: false });
        });

        this.on('data', (data) => {
            if (data.to && data.to === 'me') return;
            if (this.isConnect) this.socket.emit('data', data);
            else this.ai.emit('data', data);

            if (data.type === 'ready') this.readyMe = true;
        });
    }

    initConnect() {
        this.socket.connect();

        this.socket.emit('connection');

        this.socket.on('connected:client', (data) => {
            this.emit('connected', data);
            this.isHost = true;
            this.socket.emit('connected:host');
            console.log('host');
        });

        this.socket.on('connected:host', (data) => {
            this.emit('connected', data);
            this.isHost = false;
            console.log('client');
        });

        this.socket.on('disconnected', () => {
            this.emit('disconnected');
            console.log('disconnected');
        });
    }
}
