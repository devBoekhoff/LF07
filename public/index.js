const SystemZone = luxon.SystemZone;
const DateTime = luxon.DateTime;

const black = "rgba(0, 0, 0, 1)";
const chartOptions = {
    type: "line",
    data: {
        datasets: [
            {
                label: "Temperatur",
                data:[],        
                borderColor: "rgba(255, 0, 0, 0.5)",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                yAxisID: "y",
            },
            {
                label: "Luftfeuchtigkeit",
                data:[],                
                color: black,
                borderColor: "rgba(0, 0, 255, 0.5)",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                yAxisID: "y1",
            },
        ],
    },
    options: {
        spanGaps: false,
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        scales: {
            x: {
                type: "time",
                time: {
                    tootipFormat: "DD.MM"
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                    color: black,
                    font: {
                        size: 16,
                    },
                    maxRotation: 0,
                },
                grid:{
                    drawOnChartArea: false,
                    borderColor: black,
                    color: black,
                },
            },
            y: {
                id: "y",
                type: "linear",
                display: true,
                position: "left",
                min: 0,
                max: 30,
                ticks: {
                    color: black,
                    font: {
                        size: 16,
                    },
                },
                title: {
                    display: true,
                    text: "Temperatur in °C",
                    color: black,
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    drawOnChartArea: false,
                    borderColor: black,
                    color: black,
                },
            },
            y1: {
                id: "y1",
                type: "linear",
                display: true,
                position: "right",
                min: 0,
                max: 100,
                ticks: {
                    color: black,
                    font: {
                        size: 16,
                    },
                },
                title: {
                    display: true,
                    text: "relative Luftfeutigkeit in %",
                    color: black,
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    drawOnChartArea: false,
                    borderColor: black,
                    color: black,
                },
            },
        },
    },
};

async function requestData(uri){
    return (await fetch("/api/" + uri)).json();
} 

let currentTimeDisplay = document.getElementById("currentTime");
let currentTemperatureDisplay = document.getElementById("currentTemperature");
let currentHumidityDisplay = document.getElementById("currentHumidity");
let historicalDisplay = {};
let btnTurnServo0 = document.getElementById("turnServo0Deg");
let btnTurnServo90 = document.getElementById("turnServo90Deg");

btnTurnServo0.onclick = async function turnServo0Deg(){
    const data = await requestData("turn0"); 
    console.log(data);
};

btnTurnServo90.onclick = async function turnServo90Deg(){
    const data = await requestData("turn90");
    console.log(data);
};

async function createHistoricalDisplay(){
    const data = await requestData("today");
    let temperatureData = [];
    let humidityData = [];    
    
    let dataItem = data[0];
    temperatureData.push({x: dataItem.time, y: dataItem.temperature});
    humidityData.push({x: dataItem.time, y: dataItem.humidity});
    
    for(let i = 1; i < data.length; i++){
        let previousItem = data[i - 1];
        dataItem = data[i];

        let currentTime = DateTime.fromISO(dataItem.time);
        let previousTime = DateTime.fromISO(previousItem.time);
        let diff = currentTime.diff(previousTime);
        if(diff < 6000){
            temperatureData.push({x: dataItem.time, y: dataItem.temperature});
            humidityData.push({x: dataItem.time, y: dataItem.humidity}); 
        } else {
            temperatureData.push(null);
            humidityData.push(null);
        }
    }

    chartOptions.data.datasets[0].data = temperatureData;
    chartOptions.data.datasets[1].data = humidityData;

    historicalDisplay = new Chart("historical", chartOptions);
}

async function updateDisplays(){
    const data = await requestData("current");
    currentTimeDisplay.innerHTML = DateTime.fromISO(data.time).toLocaleString(DateTime.TIME_WITH_SECONDS);
    currentTemperatureDisplay.innerHTML = data.temperature + "°C";
    currentHumidityDisplay.innerHTML = data.humidity + "%";

    let recordedTimes = chartOptions.data.datasets[0].data;

    if(recordedTimes.length != 0){
        let lastRecordedTime = recordedTimes[recordedTimes.length - 1].x;
        if(lastRecordedTime == data.time){
            return;
        }

        let currentTime = DateTime.fromISO(data.time);
        let previousTime = DateTime.fromISO(lastRecordedTime);
        const diff = currentTime.diff(previousTime);
        if(diff > 6000){
            chartOptions.data.datasets[0].data.push(null);
            chartOptions.data.datasets[1].data.push(null); 
        }
    }

    chartOptions.data.datasets[0].data.push({x: data.time, y: data.temperature});
    chartOptions.data.datasets[1].data.push({x: data.time, y: data.humidity});

    historicalDisplay.update();
}

createHistoricalDisplay();

window.setInterval(updateDisplays, 1000);