const express = require('express');
const app = express();
const authRoute = require('./routers/auth');

require('dotenv').config();

const PORT = 5000;
app.use(express.json());

app.use("api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});