import {Dispatcher} from './Subjects';

export const PlayerListActions = {
    get() {
        Dispatcher.next({type: 'GET_PLAYERLIST'});
    }
}
