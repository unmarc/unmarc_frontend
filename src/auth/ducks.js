export const types = {
  SET_AUTH_TOKEN: 'auth/SET_AUTH_TOKEN'
};

export const setAuthToken = (authToken) => ({
  type: types.SET_AUTH_TOKEN,
  payload: {
    authToken,
  }
})

const initialState = {
  user: {
    authToken: undefined
  },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTH_TOKEN: {
      return {
        ...state,
        user: {
          authToken: action.payload.authToken,
        }
      };
    }
    default:
      return state
  }
}
