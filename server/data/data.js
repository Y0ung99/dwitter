let tweets = [
    {
        id: '1',
        text: '드림코딩 화이팅!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'asd'
    }
    ,
    {
        id: '2',
        text: '동영이 화이팅',
        createdAt: Date.now().toString(),
        name: 'Dy',
        username: 'dy',
        url: 'fgad'
    }
]

export async function getAll() {
    return tweets;
}

export async function getByUsername(username) {
    return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
    return tweets.filter(tweet => tweet.id === id);
}

export async function create(text, name, username) {
    const newTweet = {
        id: tweets.length + 1,
        text: text,
        createdAt: Date.now().toString(),
        name: name,
        username: username,
    }
    tweets = [newTweet, ...tweets];
    return newTweet;
}

export async function update(text, id) {
    const tweet = tweets.find(tweet => tweet.id === id);
    if (tweet) {
        tweet.text = text; 
    } 
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
}