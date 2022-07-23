import mongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import { findById } from './auth.js';

const ObjectId =  mongoDb.ObjectId;

export async function getAll() {
    return await getTweets()
    .find({},{sort: {createdAt: -1}})
    .toArray()
    .then(mapTweets);
}

export async function getByUsername(username) {
    return await getTweets()
    .find({username},{sort: {createdAt: -1}})
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
    return getTweets()
    .findOne({_id: ObjectId(id)})
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
    const {name, username, url} = await findById(userId);
    const tweet = {
        text,
        createdAt: new Date(),
        userId, 
        name,
        username,
        url,
    }
    return getTweets()
    .insertOne(tweet)
    .then(data => mapOptionalTweet({...tweet, _id: data.insertedId}));
}

export async function update(text, id) {
    return getTweets()
    .findOneAndUpdate(
        { _id: ObjectId(id) }, 
        { $set: { text } },
        { returnDocument: 'after' },
    )
    .then(result => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
    return getTweets()
    .deleteOne({_id: ObjectId(id)});
}

function mapOptionalTweet(tweet) {
    return tweet 
    ? {...tweet, id: tweet._id.toString()}
    : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}