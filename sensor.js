exports.read = function (sensorType_Dummy, gpioPin_Dummy, resultHandler){
    const error= false;
    const temperature = getRandomTemperature();
    const humidity = getRandomHumidity();
    resultHandler(error, temperature, humidity);
}

function getRandomTemperature(){
    return getRandomRange(15, 25)+ "°C";
}

function getRandomHumidity(){
    return getRandomRange(40, 70) + "%";
}

function getRandomRange(min, max){
    return (Math.random() * (max - min) + min).toFixed(1);
}