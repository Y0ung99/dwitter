export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    const response = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({username, password, name, email, url}),
    })
    
    this.tokenStorage.saveToken(response.token);  
    return response;
  }

  async login(username, password) {
    const response = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })

    this.tokenStorage.saveToken(response.token);
    return response;
  }


  async me() {
    const token = await this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`},
    })
  }

  async logout() {
    this.tokenStorage.clearToken();
  }

}