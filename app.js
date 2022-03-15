const express = require('express');
const app = express();
const port = 3000;
const repository = require("./modules/repository")

app.use(express.static("public"));
app.use(express.static("shared"));

app.get('/api/current', (req, res) =>{
    const data = repository.getLast();
    return res.json(data);
});

app.get('/api/lastWeek', async (req, res) =>{
    const data = await repository.getLastDay();
    return res.json(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

setInterval(repository.save, 5000);