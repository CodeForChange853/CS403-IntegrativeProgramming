const express = require('express');
const router = express.Router();
const novelsController = require('../controllers/novelsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', novelsController.getAllNovels);
router.get('/:id', novelsController.getNovelById);
router.post('/', authMiddleware, novelsController.addNovel);
router.patch('/:id', authMiddleware, novelsController.updateNovel);
router.delete('/:id', authMiddleware, novelsController.deleteNovel);

module.exports = router;
