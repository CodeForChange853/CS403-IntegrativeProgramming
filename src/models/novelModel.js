let nextId = 5;
const novels = [
    { id: 1, title: 'Lord of the Mysteries', author: 'Cuttlefish That Loves Diving' },
    { id: 2, title: 'Reverend Insanity', author: 'Gu Zhen Ren' },
    { id: 3, title: 'Dune', author: 'Frank Herbert' },
    { id: 4, title: '1984', author: 'George Orwell' }
];

module.exports = {
    getAll: () => novels,
    getById: (id) => novels.find(n => n.id === id),
    add: (novelData) => {
        const newNovel = { id: nextId++, ...novelData };
        novels.push(newNovel);
        return newNovel;
    },
    update: (id, updateData) => {
        const novel = novels.find(n => n.id === id);
        if (!novel) return null;
        if (updateData.title !== undefined) novel.title = updateData.title;
        if (updateData.author !== undefined) novel.author = updateData.author;
        return novel;
    },
    delete: (id) => {
        const index = novels.findIndex(n => n.id === id);
        if (index === -1) return null;
        const deletedNovel = novels.splice(index, 1);
        return deletedNovel[0];
    }
};
