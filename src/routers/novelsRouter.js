const express = require('express');
const router = express.Router();
const novelsController = require('../controllers/novelsController');

router.get('/', novelsController.getAllNovels);
router.get('/:id', novelsController.getNovelById);
router.post('/', novelsController.addNovel);
router.patch('/:id', novelsController.updateNovel);
router.delete('/:id', novelsController.deleteNovel);

module.exports = router;
