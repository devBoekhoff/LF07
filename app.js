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
        console.log("couldn't open servo");
        return;
    }

    try{
        await servo.setDegree(90);
    } catch{
        console.log("couldn't turn servo to 90°");
        return;
    }

    try{
        await sleep(1000);
    }
    catch{
        console.log("couldn't wait");
        return;
    }
    
    try{
        await servo.open();
    } catch{
        console.log("couldn't open servo");
        return;
    }
    
    try{
        await servo.setDegree(90);
    } catch{
        console.log("couldn't turn servo to 90°");
        return;
    }
}

setInterval(moveServo, 2000);