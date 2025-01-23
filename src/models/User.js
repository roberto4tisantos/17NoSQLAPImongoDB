import mongoose from 'mongoose';
// import { Schema, model, Document } from 'mongoose';

//const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const userSchema = new Schema(
  {
    username: { 
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Uses mongoose.model() to create model
const User = mongoose.model('User', userSchema);

module.exports = User;
export default User;
export function findByIdAndUpdate(userId, body, arg2) {
  throw new Error('Function not implemented.');
}

export function findByIdAndDelete(userId) {
  throw new Error('Function not implemented.');
}

export function find() {
  throw new Error('Function not implemented.');
}

export function findById(userId) {
  throw new Error('Function not implemented.');
}

