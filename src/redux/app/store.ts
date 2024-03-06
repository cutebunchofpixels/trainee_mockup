import { createStore } from 'redux'
import { rootReducer } from 'redux/reducers'

export const store = createStore(rootReducer)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
