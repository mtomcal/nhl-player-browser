import Rx from 'rxjs';
import axios from 'axios'

let _state = {
    playerList: []
};

const Dispatcher = new Rx.Subject();

export const PlayerListActions = {
    get() {
        Dispatcher.next({type: 'GET_PLAYERLIST'});
    }
}

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
    });

export const stateStream = Rx.Observable.merge(PlayerListStream)
    .map((fragment) => {
        _state = Object.assign({}, _state, fragment);
        return _state;
    })
    .publishReplay(1)

stateStream.connect();

stateStream.subscribe((res) => console.log(res), (err) => console.log(err))
