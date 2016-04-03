import { combineReducers } from 'redux'

function PlayerList(state = {
  isFetched: false,
  body: []
}, action) {
  switch (action.type) {
    case 'GET_PLAYERLIST':
      return Object.assign({}, state, {
        isFetched: false
      });
    case 'RECEIVED_PLAYERLIST':
      return Object.assign({}, state, {
        isFetched: true,
        body: action.payload
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  PlayerList
});

export default rootReducer;
