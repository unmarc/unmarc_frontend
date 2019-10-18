import { setContext } from 'apollo-link-context'
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http'
import Cookies from 'js-cookie'
import { authContext } from '../auth/authService'


export const httpLink = createHttpLink({
  uri: '/gql-pub/',
  credentials: 'same-origin'
})

export const staffHttpLink = createHttpLink({
  uri: '/gql-pvt/',
  credentials: 'same-origin'
})


export const csrfHeaderLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-CSRFToken": Cookies.get('csrftoken'),
    }
  }
})

export const createErrorLink = (callbackFn) =>
  onError(({ networkError }) => {
    if (networkError.statusCode === 403) callbackFn()
  }
);
