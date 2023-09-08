import EventEmitter from 'eventemitter3';
import socket from './Socket/socket';

export type TRTCPeerOptions = { room?: string; config?: RTCConfiguration };
export type TEventNames = 'ready' | 'data' | 'connected' | 'disconnected' | 'ready:complete' | 'ready:text';
export default class Communication extends EventEmitter<TEventNames> {
    socket;
    isConnect = false;
    otherId = '';
    readyMe = false;
    readyYou = false;
    isHost = true;

    constructor() {
        super();

        this.socket = socket;
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

        this.on('ready', () => {
            if (this.isConnect) {
                this.readyMe = true;

                this.socket.emit('data', { type: 'ready:other' });
            } else {
                this.readyMe = true;
                this.readyYou = true;

                this.emit('data', { type: 'ready:complete' });
            }
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

        this.socket.on('data', (data) => {
            console.log(data);
        });
    }
}
