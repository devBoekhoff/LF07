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

app.get('/api/current', async (req, res) =>{
    let data = await sensor.read(11,4);
    data.temperature = data.temperature.toFixed(1) + "°C";
    data.humidity = data.humidity.toFixed(1) + "%";
    return res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
