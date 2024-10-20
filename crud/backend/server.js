// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/Users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:27017`);
});
