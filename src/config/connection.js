import mongoose from 'mongoose'; 
const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/developersApplications');

mongoose.connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to socialNetwork database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

export default mongoose.connection;