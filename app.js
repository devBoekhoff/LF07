const express = require('express');
const app = express();
const port = 3000;
//var sensor = require("node-dht-sensor");

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

        /*res.writeHead(200,{"Content-Type":"text/plain"});
        sensor.read(11, 4, function(err, temperature, humidity)
            {
                if (!err)
                {
                    res.end(`temp: ${temperature}°C, humidity: ${humidity}%\n`);
                }
            }
        );*/