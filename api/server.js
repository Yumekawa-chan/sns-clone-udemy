const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = 5000;

const prisma = new PrismaClient();

app.use(express.json());

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
app.post("/api/auth/register",async (req, res) => { 
  const { username, email, password } = req.body;
  const hashedPassword = await bycrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    }
  });
  return res.json({ user });
});

// ユーザーログインAPI
app.post('/api/auth/login', async (req, res) => { 
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isPasswordValid = await bycrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  
  const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1d' }, process);
  return res.json({ token });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});