import gql from 'graphql-tag'
import Cookies from 'js-cookie'


const USER_PROFILE_QUERY = gql`
    query {
      me {
        username
        name
        staff {
            isLibraryAdmin
        }    
      }
    }
`

class AuthService {
    login(username, password) {
        return fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: `username=${username}&password=${password}`
        });
    }

    logout() {
        return fetch('/logout/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        });
    }

    fetchUserInfo(apolloClient, onSuccess) {
        apolloClient.query({
            query: USER_PROFILE_QUERY,
            fetchPolicy: 'no-cache'
        })
          .then(({ data }) => onSuccess(data.me))
          .catch()
    }
}

const authService = new AuthService()
export default authService
