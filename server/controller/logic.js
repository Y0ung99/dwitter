import * as tweetRepository from '../data/data.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username 
    ? tweetRepository.getByUsername(username)
    : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweetsById(req, res) {
    const id = req.params.id;
    const data = await tweetRepository.getById(id);
    data 
    ? res.status(200).json(data)
    : res.status(404).json({message: `Tweet id(${id}) not found`});
}

export async function createTweet(req, res) {
    const {text, name, username} = req.body;
    const newTweet = await tweetRepository.create(text, name, username);
    res.status(201).json(newTweet);
}

export async function updateTweet(req, res) {
    const id = req.params.id;
    const newText = req.body.text;
    const tweet = await tweetRepository.update(newText, id);
    tweet 
    ? res.status(200).json(tweet)
    : res.status(404).json({message: `Tweet id(${id}) not found`});
}

export async function removeTweet(req, res) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}