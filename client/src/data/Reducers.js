import Rx from 'rxjs';
import axios from 'axios'
import {Dispatcher, stateSubject} from './Subjects';

const PlayerListStream = Dispatcher
    .filter((action) => action.type === 'GET_PLAYERLIST')
    .flatMap((action) => Rx.Observable.fromPromise(
      axios.get(`http://localhost:3000/graphql`, {
        params: {
          query: `
            query {
              players {
                playerName
                playerId
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

PlayerListStream
  .do(function (fragment) {
    stateSubject.next(fragment);
  })
  .subscribe(null, (err) => console.log(err));
