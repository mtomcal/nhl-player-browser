import Rx from 'rxjs';

export const Dispatcher = new Rx.ReplaySubject(1);

export const stateSubject = new Rx.ReplaySubject(1);
