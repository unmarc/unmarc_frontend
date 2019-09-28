import { compose, createStore } from "redux";

import { isDevEnv } from "../common/constants"
import rootReducer from "./rootReducer"


const configureStore = initialState => {

  const _compose = (isDevEnv && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const _store = createStore(rootReducer, initialState, _compose());

  if (isDevEnv && module.hot) {
    module.hot.accept('./rootReducer', () => _store.replaceReducer(rootReducer))
  }

  return _store
}

export const store = configureStore()
