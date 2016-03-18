import Rx from 'rxjs';
import jQuery from 'jquery';

Rx.config.longStackSupport = true;

let _state = {
    players: {},
    playerList: []
};

const Dispatcher = new Rx.ReplaySubject(1);


export const PlayerActions = {
    get(id) {
        Dispatcher.onNext({type: 'GET_PLAYER', id});
    }
}

export const PlayerListActions = {
    get() {
        Dispatcher.onNext({type: 'GET_PLAYERLIST'});
    }
}

window.PlayerListActions = PlayerListActions;

const PlayerStream = Dispatcher
    .filter((action) => action.type === 'GET_PLAYER')
    .flatMap((action) => Rx.Observable.fromPromise(jQuery.getJSON(`//statsapi.web.nhl.com/api/v1/people/${action.id}?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team&site=en_nhl`)))
    .flatMap((res) => {
        return res.people;
    })
    .map((res) => {
        return {
            players: Object.assign(_state.players, {
                [res.id]: res
            })
        }
    });

const PlayerListStream = Dispatcher
    .filter((action) => action.type === 'GET_PLAYERLIST')
    .flatMap((action) => {
        return Rx.Observable.fromPromise(
            jQuery.getJSON(`http://www.nhl.com/stats/rest/grouped/skaters/season/goals?cayenneExp=seasonId=20152016%20and%20gameTypeId=2%20and%20playerIsActive=1`)
        );
    })
    .map((res) => {
        return {
            playerList: res.data
        }
    });

export const stateStream = Rx.Observable.merge(PlayerStream, PlayerListStream)
    .map((fragment) => {
        _state = Object.assign({}, _state, fragment);
        return _state;
    })
    .shareReplay(1);

stateStream
    .subscribe((res) => console.log(res))
