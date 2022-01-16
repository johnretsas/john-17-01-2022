import { createStore, applyMiddleware, combineReducers, compose } from "@reduxjs/toolkit";
import { socketMiddleware } from "../middleware/socket";
import socketReducer from "../app/reducers/socket";

const rootReducer = combineReducers({socket: socketReducer, })
const middlewareEnhancer = applyMiddleware(socketMiddleware)
const composeEnhancers = compose(middlewareEnhancer,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
export const store = createStore(rootReducer,  composeEnhancers)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

