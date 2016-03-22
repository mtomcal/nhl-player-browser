import Rx from 'rxjs';
import axios from 'axios'

// State Stack
export const stateSubject = new Rx.Subject();

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


// Actions and Dispatcher

const Dispatcher = new Rx.Subject();

export const PlayerListActions = {
    get() {
        Dispatcher.next({type: 'GET_PLAYERLIST'});
    }
}

// Reducer Stack

const PlayerListStream = Dispatcher
    .filter((action) => action.type === 'GET_PLAYERLIST')
    .flatMap((action) => Rx.Observable.fromPromise(
      axios.get(`http://localhost:3000/graphql`, {
        params: {
          query: `
            query {
              players {
                playerName
                goals
              }
            }
          `
        }
      }))
    )
    .map((res) => {
        return res.data.data;
    })
    .map((res) => {
      return {
        playerList: res.players
      };
    })

Rx.Observable.merge(PlayerListStream)
  .do(function (fragment) {
    stateSubject.next(fragment);
  })
  .subscribe(null, (err) => console.log(err));
