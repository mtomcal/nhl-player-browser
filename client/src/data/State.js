import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './Reducers'
var finalCreateStore = compose(applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
export default finalCreateStore(rootReducer);
