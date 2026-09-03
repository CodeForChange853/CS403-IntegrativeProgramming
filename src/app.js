const express = require('express');
const port = 3000;

let nextId = 5;
const students = [
    { id: 1, name: 'John', course: 'BSIT' },
    { id: 2, name: 'Jane', course: 'BSIT' },
    { id: 3, name: 'Bob', course: 'BSCS' },
    { id: 4, name: 'Alice', course: 'BSCS' }
];

const app = express();

app.use(express.json());

//get method
app.get('/students', (req, res) => {
    res.send(students);
});

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).send({ message: 'Student not found' });
    }
    res.send(student);
});

//post method
app.post('/addStudents', (req, res) => {
    const newName = req.body.name;
    const newCourse = req.body.course;

    const newStudent = { id: nextId++, name: newName, course: newCourse };
    students.push(newStudent);
    res.send(newStudent);
});

//patch method
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).send({ message: 'Student not found' });
    }

    if (req.body.name !== undefined) student.name = req.body.name;
    if (req.body.course !== undefined) student.course = req.body.course;

    res.send(student);
});

//delete method
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send({ message: 'Student not found' });
    }

    const deletedStudent = students.splice(index, 1);
    res.send(deletedStudent[0]);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

//Invoke-RestMethod -Uri http://localhost:3000/addStudents -Method Post -ContentType "application/json" -Body '{"name": "Mark", "course": "BSIT"}'