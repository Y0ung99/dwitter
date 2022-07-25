import mongoose from 'mongoose';
import {config} from '../config.js';


let user;
let tweet;

export function useVirtualId(Schema) {
    Schema.virtual('id').get(function() {
        return this._id.toString();
    });
    Schema.set('toJSON', {virtuals: true});
    Schema.set('toObject', {virtuals: true});
}

export async function connectDB() {
    return mongoose.connect(config.db.host);
}

export function getUsers() {
    return db.collection('users');
}

export function getTweets() {
    return db.collection('tweets');
}

