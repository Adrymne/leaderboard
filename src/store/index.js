import { createStore, compose } from 'redux';
import { install } from 'redux-loop';
import rootReducer from './reducers';
import { setActiveList } from 'store/actions';
import { UserList } from 'types';

const store = createStore(
  rootReducer,
  compose(
    install(),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v
  )
);
store.dispatch(setActiveList(UserList.RecentTop));

export default store;
