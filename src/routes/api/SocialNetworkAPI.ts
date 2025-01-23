const express = require('express');
const User = require('../../models/User'); 
const Thought = require('../../models/Thought'); 

const router = express.Router();

// /api/users
// GET all users
router.get('/users', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET a single user by its _id
router.get('/users/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate('thoughts')
    .populate('friends');
  res.json(user);
});

// POST to create a new user
router.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// PUT to update a user by its _id
router.put('/users/:userId', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE to remove a user by its _id
router.delete('/users/:userId', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userId);
  await Thought.deleteMany({ username: deletedUser.username }); // BONUS: Delete associated thoughts
  res.json(deletedUser);
});

// /api/thoughts
// POST to create a new thought
router.post('/thoughts', async (req, res) => {
  const newThought = new Thought(req.body);
  await newThought.save();
  await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
  res.json(newThought);
});

// GET all thoughts
router.get('/thoughts', async (_req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  res.json(thought);
});

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
  res.json(deletedThought);
});

// /api/users/:userId/friends/:friendId
// POST to add a new friend
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friend = await User.findById(req.params.friendId);
  user.friends.push(friend);
  await user.save();
  res.json(user);
});

// DELETE to remove a friend
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.friends.pull(req.params.friendId);
  await user.save();
  res.json(user);
});

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  thought.reactions.push(req.body);
  await thought.save();
  res.json(thought);
});

// DELETE to remove a reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  thought.reactions.pull(req.params.reactionId);
  await thought.save();
  res.json(thought);
});

module.exports = router;
