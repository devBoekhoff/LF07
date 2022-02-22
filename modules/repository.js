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

const getLastWeek = async function getLastWeek(){
    const currentDate = DateTime.utc();
    const oneWeekAgo = DateTime.utc().minus({days: 7}); 
    const result = await handle(
        database.getSensorDataForDates(oneWeekAgo, currentDate)
    );
    
    if(!result.error){
        cached = result.data;
    }
    return cached;
}

getLastWeek();

exports.save = save;
exports.getLast = getLast;
exports.getLastWeek = getLastWeek;