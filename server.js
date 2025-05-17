const express = require('express');
const mongoose = require('mongoose');
const app = express();
const noteRoutes = require('./app');

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoHost = process.env.MONGO_HOST || 'mongo-service';
const dbName = 'testdb';

const uri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:27017/${dbName}?authSource=admin`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

app.use(express.json());
app.use('/', noteRoutes);

app.listen(3000, () => console.log('🚀 Server is running on port 3000'));
