const SystemZone = luxon.SystemZone;
const DateTime = luxon.DateTime;

const black = "rgba(0, 0, 0, 1)";
const chartOptions = {
    type: "line",
    data: {
        labels: [],
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

let currentTemperatureDisplay = document.getElementById("currentTemperature");
let currentHumidityDisplay = document.getElementById("currentHumidity");

async function updateCurrentDisplay(){
    const data = await requestData("current");
    currentTemperatureDisplay.innerHTML = data.temperature + "°C";
    currentHumidityDisplay.innerHTML = data.humidity + "%";
}

async function updateHistoricalDisplay(){
    const data = await requestData("lastWeek");
    let temperatureData = [];
    let humidityData = [];    
    let dateLabels= [];
    for(let dataItem of data){
        temperatureData.push({x: dataItem.time, y: dataItem.temperature});
        humidityData.push({x: dataItem.time, y: dataItem.humidity});
        dateLabels.push(dataItem.time);
    }
    chartOptions.data.datasets[0].data = temperatureData;
    chartOptions.data.datasets[1].data = humidityData;
    chartOptions.data.labels = dateLabels;

    new Chart("historical", chartOptions);
}

updateHistoricalDisplay();

window.setInterval(updateCurrentDisplay, 1000);