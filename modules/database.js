const { SensorData } = require('../shared/sensorData');
const { DateTime, FixedOffsetZone } = require("luxon");
const { Client, types } = require('pg');
const dbClient = new Client({
    user: 'pi',
    host: 'localhost',
    database: 'app',
    password: 'buddybibi',
    port: 5432,
});
dbClient.connect();

const table = 'sensor';

types.setTypeParser(1114, str => str);

exports.save = async function (sensorData){
    await dbClient.query(
        `INSERT INTO ${table}(temperature, humidity, time) ` +
        'VALUES($1, $2, $3)',
        sensorData.AsArray()
    );
}

exports.getLast = async function (){
    const { rows } = await dbClient.query(
        `SELECT * ` +
        `FROM ${table} ` +
        'ORDER BY time ' +
        'LIMIT 1'
    );
    const row = rows[0];
    return new SensorData(row.temperature, row.humidity, row.time);
}

exports.getSensorDataForDates = async function (startDate, endDate){
    const { rows } = await dbClient.query(
        `SELECT * ` +
        `FROM ${table} ` +
        `WHERE time BETWEEN $1 AND $2`,
        [startDate, endDate]
    );
    
    const sensorData = [];
    for(let row of rows){
        sensorData.push(
            new SensorData(
                row.temperature,
                row.humidity,
                DateTime.fromSQL(row.time, {zone: FixedOffsetZone.utcInstance})
            )
        );
    } 
    return sensorData;
}