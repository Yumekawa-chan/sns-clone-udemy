require('dotenv').config();

const express = require('express');
const app = express();
const authRoute = require('./routers/auth');
const postsRoute = require('./routers/posts');
const cors = require('cors');

const PORT = 5000;
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});