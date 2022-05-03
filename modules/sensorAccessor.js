let sensor;
if (process.platform == "win32"){
    sensor = require("./mockSensor");
} else {
    sensor = require("node-dht-sensor");
}
const { SensorData } = require("../shared/sensorData");
const { DateTime } = require("luxon");

exports.read = async function (){
    let rawData = await sensor.read(11,4); 
    console.log(rawData);
    return new SensorData(
        rawData.temperature.toFixed(1),
        rawData.humidity.toFixed(1),
        DateTime.utc()
    );
}