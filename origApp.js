const express = require('express');
const port = 3000;

let nextId = 5;
const novels = [
    { id: 1, title: 'Lord of the Mysteries', author: 'Cuttlefish That Loves Diving' },
    { id: 2, title: 'Reverend Insanity', author: 'Gu Zhen Ren' },
    { id: 3, title: 'Dune', author: 'Frank Herbert' },
    { id: 4, title: '1984', author: 'George Orwell' }
];

const app = express();

app.use(express.json());

//get method
app.get('/novels', (req, res) => {
    res.send(novels);
});

app.get('/novels/:id', (req, res) => {
    const novel = novels.find(n => n.id === parseInt(req.params.id));
    if (!novel) {
        return res.status(404).send({ message: 'Novel not found' });
    }
    res.send(novel);
});

//post method
app.post('/addNovels', (req, res) => {
    const newTitle = req.body.title;
    const newAuthor = req.body.author;

    const newNovel = { id: nextId++, title: newTitle, author: newAuthor };
    novels.push(newNovel);
    res.send(newNovel);
});

//patch method
app.patch('/novels/:id', (req, res) => {
    const novel = novels.find(n => n.id === parseInt(req.params.id));
    if (!novel) {
        return res.status(404).send({ message: 'Novel not found' });
    }

    if (req.body.title !== undefined) novel.title = req.body.title;
    if (req.body.author !== undefined) novel.author = req.body.author;

    res.send(novel);
});

//delete method
app.delete('/novels/:id', (req, res) => {
    const index = novels.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send({ message: 'Novel not found' });
    }

    const deletedNovel = novels.splice(index, 1);
    res.send(deletedNovel[0]);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

//Invoke-RestMethod -Uri http://localhost:3000/addNovels -Method Post -ContentType "application/json" -Body '{"title": "The Hobbit", "author": "J.R.R. Tolkien"}'