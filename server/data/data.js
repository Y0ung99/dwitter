import Mongoose from 'mongoose';
import { getTweets, useVirtualId } from '../db/database.js';
import { findById }from './auth.js';

const tweetSchema = new Mongoose.Schema({
    text: {type: String, required: true },
    userId: {type: String, required: true },
    name: {type: String, required: true },
    username: {type: String, required: true },
    url: String,
}, 
{timestamps: true} 
)

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
    return Tweet.find().sort({createdAt: -1});
}

export async function getByUsername(username) {
    return Tweet.find({username}).sort({createdAt: -1});
}

export async function getById(id) {
    return Tweet.findById(id);
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
    return new Tweet(tweet).save().then(data => data._doc);
}

export async function update(text, id) {
    return Tweet.findByIdAndUpdate(id, {text}, {returnOriginal: false})
}

export async function remove(id) {
    return Tweet.findByIdAndDelete(id);
}