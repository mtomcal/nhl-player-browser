import axios from 'axios';

export const PlayerListActions = {
  request() {
    return {type: 'GET_PLAYERLIST'};
  },
  receive(payload) {
    return {type: 'RECEIVED_PLAYERLIST', payload};
  },
  fetch() {
    return function (dispatch) {
      return axios.get(`http://localhost:3000/graphql`, {
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
      })
      .then(function (res) {
        dispatch(PlayerListActions.receive(res.data.data.players));
      });
    }
  }
}
