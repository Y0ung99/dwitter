export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    console.log(this.baseURL);
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const data = response.json();

    if(response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text, username: 'Dy', name: 'dy'}),
    });
    const data = response.json();
    if(response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
  
    if(response.status !== 204) {
      throw new Error('hi');
    }

  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: text}),
    });
    const data = response.json();
    if(response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
