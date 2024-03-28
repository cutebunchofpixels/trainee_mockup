import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

import { rootReducer } from 'src/redux/reducers'

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
