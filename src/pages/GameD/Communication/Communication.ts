import EventEmitter from 'eventemitter3';

export type TRTCPeerOptions = { room?: string; config?: RTCConfiguration };
export type TEventNames =
    | 'created'
    | 'joined'
    | 'data'
    | 'connected'
    | 'disconnected'
    | 'disconnected:dealy'
    | 'open:send'
    | 'close:send'
    | 'error'
    | 'error:icecandidate';
export default class Communication extends EventEmitter<TEventNames> {
    isAi = false;

    constructor() {
        super();
    }
}
