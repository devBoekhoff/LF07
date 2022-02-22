exports.read = async function (sensorType_Dummy, gpioPin_Dummy){
    const temperature = getRandomTemperature();
    const humidity = getRandomHumidity();
    return {temperature, humidity};
}

function getRandomTemperature(){
    return getRandomRange(15, 25);
}

function getRandomHumidity(){
    return getRandomRange(40, 70);
}

function getRandomRange(min, max){
    return (Math.random() * (max - min) + min);
}