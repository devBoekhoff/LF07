var http=require('http');
var sensor = require("node-dht-sensor");

var server=http.createServer(function(request,response)
    {
        response.writeHead(200,{"Content-Type":"text/plain"});
        sensor.read(11, 4, function(err, temperature, humidity)
            {
                if (!err)
                {
                    response.end(`temp: ${temperature}°C, humidity: ${humidity}%\n`);
                }
            }
        );
    }
);
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");