const express = require('express');
const novelsRouter = require('./routers/novelsRouter');

const app = express();
const port = 3000;

app.use(express.json());

// mount the novels router
app.use('/novels', novelsRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

//Invoke-RestMethod -Uri http://localhost:3000/novels -Method Post -ContentType "application/json" -Body '{"title": "The Hobbit", "author": "J.R.R. Tolkien"}'