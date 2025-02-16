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
        res.status(201).json(newPost);
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// 最新つびやき取得用
router.get('/get_latest_post', async (req, res) => { 
    try {
        const latestPosts = await prisma.post.findMany({ take: 10, orderBy: { createdAt: "desc" } });
        return res.json(latestPosts);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;    