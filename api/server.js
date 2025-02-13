const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const PORT = 5000;

const prisma = new PrismaClient();

app.get('/', async(req, res) => { 
  res.send('<h1>Hello World</h1>');
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    }
  });
  return res.json({ user });
});

// 新規ユーザー登録API
app.post("/api/auth/register", (req, res) => { 
  const { username, email, password } = req.body;
  const user = await 
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});