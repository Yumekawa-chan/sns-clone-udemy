const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();
const prisma = new PrismaClient();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// つぶやく投稿用
router.post("/post",async (req, res) => { 
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    try {
        const newPost = await prisma.post.create({
            data: {
                content,
                authorId: 1, // 仮の値
            }
        })    
        res.status(201).json({ newPost });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });
    return res.json({ user });
  });
  

// 最新つびやき取得用
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