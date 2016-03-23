import Rx from 'rxjs';
import {stateSubject} from './Subjects';

export const stateStream = stateSubject
    .startWith({
        playerList: []
    })
    .scan((state, fragment) => {
        return Object.assign({}, state, fragment);
    }, {})
    .publishReplay(1);

stateStream.connect();

stateStream.subscribe((res) => console.log(res), (err) => console.log(err));
