import { setContext } from 'apollo-link-context'
import { onError } from "apollo-link-error";
import { createHttpLink } from 'apollo-link-http'
import Cookies from 'js-cookie'


export const httpLink = createHttpLink({
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

export const createErrorLink = (on403Callback) =>
  // When 403 Forbidden received since this app is entirely logged-in only
  onError(({ networkError }) => {
        if (networkError.statusCode === 403) on403Callback()
    }
  )
