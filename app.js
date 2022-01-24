const express = require('express');
const app = express();
const port = 3000;
let sensor;
if (process.platform == "win32"){
    sensor = require("./sensor");
} else {
    sensor =require("node-dht-sensor");
}

app.use(express.static("public"));

app.get('/api/current', (req, res) =>{
    let data;
    sensor.read(11, 4, (err, temperature, humidity) => {
        if (!err) {
            data = {temperature: temperature, humidity: humidity};
        }
    });
    return res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});