const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes/api/socialNetworkAPI');
const connection = require('../config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
