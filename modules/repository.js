const database = require("./database");
const { DateTime } = require("luxon");
const sensorAccessor = require("./sensorAccessor");

async function handle(func){
    let result = {data: null, error: null};
    try{
        result.data = await func;
    } catch(error){
        console.error(error);        
        result.error = error;
    }
    return result;
}

let cached = [];

const save = async function (){    
    const sensorData = await sensorAccessor.read();
    const result = await handle(
        database.save(sensorData)
    );
    if(!result.error){
        cached.push(sensorData);
    }
}

const getLast = function (){    
    return cached[cached.length - 1];
}

const getLastDay = async function getLastDay(){
    const currentDate = DateTime.utc();
    const yesterday = DateTime.utc().minus({days: 1}); 
    const result = await handle(
        database.getSensorDataForDates(yesterday, currentDate)
    );
    
    if(!result.error){
        cached = result.data;
    }
    
    return cached;
}

getLastDay();

exports.save = save;
exports.getLast = getLast;
exports.getLastDay = getLastDay;