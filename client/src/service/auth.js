export default class AuthService {
  constructor(http) {
    this.http = http;
  }
  async login(username, password) {
    return this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    return this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({username, password, name, email, url}),
    })
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    })
  }
}
