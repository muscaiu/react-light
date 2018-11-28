import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import statusReducer from './statusReducer';

const rootReducer = combineReducers({
  status: statusReducer,
  firestore: firestoreReducer
})

export default rootReducer;
