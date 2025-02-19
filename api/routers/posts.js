const { PrismaClient } = require('@prisma/client');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = require('express').Router();
const prisma = new PrismaClient();

// つぶやく投稿用
router.post("/post", isAuthenticated, async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }
    try {
        const newPost = await prisma.post.create({
            data: {
                content,
                authorId: req.userId
            },
            include: { author: { include: { profile: true } } }
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
        const latestPosts = await prisma.post.findMany({ take: 10, orderBy: { createdAt: "desc" }, include: { author: { include: { profile: true } } } });
        return res.json(latestPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// その閲覧しているユーザーのつぶやき取得用
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await prisma.post.findMany({
            where: {
                authorId: parseInt(userId)
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: true,
            }
        });
        return res.status(200).json(userPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;    