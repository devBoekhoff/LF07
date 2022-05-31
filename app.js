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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

setInterval(repository.save, 5000);

const servo = new piServo(22);

async function moveServo(){
    try{
        await servo.open();
    } catch{
        console.log("couldn't open sensor");
        return;
    }
    await servo.setDegree(90);
    await sleep(1000);
    await servo.open();
    await servo.setDegree(0);
}

setInterval(moveServo, 2000);