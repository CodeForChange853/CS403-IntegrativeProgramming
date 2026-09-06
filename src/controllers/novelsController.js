const novelModel = require('../models/novelModel');

const getAllNovels = (req, res) => {
    res.send(novelModel.getAll());
};

const getNovelById = (req, res) => {
    const novel = novelModel.getById(parseInt(req.params.id));
    if (!novel) {
        return res.status(404).send({ message: 'Novel not found' });
    }
    res.send(novel);
};

const addNovel = (req, res) => {
    const newTitle = req.body.title;
    const newAuthor = req.body.author;

    const newNovel = novelModel.add({ title: newTitle, author: newAuthor });
    res.send(newNovel);
};

const updateNovel = (req, res) => {
    const updatedNovel = novelModel.update(parseInt(req.params.id), {
        title: req.body.title,
        author: req.body.author
    });
    if (!updatedNovel) {
        return res.status(404).send({ message: 'Novel not found' });
    }
    res.send(updatedNovel);
};

const deleteNovel = (req, res) => {
    const deletedNovel = novelModel.delete(parseInt(req.params.id));
    if (!deletedNovel) {
        return res.status(404).send({ message: 'Novel not found' });
    }
    res.send(deletedNovel);
};

module.exports = {
    getAllNovels,
    getNovelById,
    addNovel,
    updateNovel,
    deleteNovel
};
