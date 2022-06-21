const express = require('express');
const app = express();
const port = 80;
const repository = require("./modules/repository");
const Gpio = require('pigpio').Gpio;

const motor = new Gpio(25, {mode: Gpio.OUTPUT});

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
        motor.servoWrite(500);
        return res.json("sucessfully turned to 0°");   
    } catch (error) {
        return res.json(error);
    }
})

app.get('/api/turn90', async (req, res) =>{
    try {
        motor.servoWrite(2500);
        return res.json("sucessfully turned to 90°");   
    } catch (error) {
        return res.json(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

setInterval(repository.save, 5000);