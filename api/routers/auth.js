const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();
const prisma = new PrismaClient();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 新規ユーザー登録API
router.post("/register",async (req, res) => { 
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
router.post('/login', async (req, res) => { 
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

module.exports = router;    