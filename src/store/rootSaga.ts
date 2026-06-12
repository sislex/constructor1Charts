import { all } from 'redux-saga/effects';
import { marketDataSaga } from './sagas/marketDataSaga';

export function* rootSaga() {
  yield all([marketDataSaga()]);
}
