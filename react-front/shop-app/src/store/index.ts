import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { CategoryReducer } from "../components/home/reducer";

export const rootReducer = combineReducers({
    categories: CategoryReducer
});

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));