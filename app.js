const express = require('express');
const app = express();
const port = 80;
const repository = require("./modules/repository");
const piServo = require('pi-servo');

app.use(express.static("public"));
app.use(express.static("shared"));

app.get('/api/current', (req, res) =>{
    const data = repository.getLast();
    return res.json(data);
});

app.get('/api/today', async (req, res) =>{
    const data = await repository.getLastDay();
    return res.json(data);
})

const servo = new piServo(22);

app.get('/api/turn0', async (req, res) =>{
    try {
        await servo.open();
        await servo.setDegree(0);
        return res.json("sucessfully turned to 0°");   
    } catch (error) {
        return res.json(error);
    }
})

app.get('/api/turn90', async (req, res) =>{
    try {
        await servo.open();
        await servo.setDegree(90);
        return res.json("sucessfully turned to 90°");   
    } catch (error) {
        return res.json(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

setInterval(repository.save, 5000);