import Cookies from 'js-cookie'


class AuthService {

  async login(username, password, successCallback, errCallback) {
    try {
      const response = await fetch('/login/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        body: `username=${username}&password=${password}`
      });
      try {
        await response.json()
      }
      catch (e) {}
      successCallback && successCallback()
    }
    catch (error) {
      console.error(error)
      errCallback && errCallback(error)
    }
  }

  async logout() {
    try {
      const response = await fetch('/logout/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      });
      try {
        await response.json()
      }
      catch (e) {}
    }
    catch (error) {
      console.error(error)
    }

  }
}

const authService = new AuthService()
export default authService
