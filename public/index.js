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
                borderColor: "rgba(0, 0, 255, 0.5)",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                yAxisID: "y1",
            },
        ],
    },
    options: {
        responsive: true,
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
                },
            },
            y: {
                id: "y",
                type: "linear",
                display: true,
                position: "left",
                min: 0,
                max: 30,
            },
            y1: {
                id: "y1",
                type: "linear",
                display: true,
                position: "right",
                min: 0,
                max: 100,

                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    },
};

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

let currentTemperatureDisplay = document.getElementById("currentTemperature");
let currentHumidityDisplay = document.getElementById("currentHumidity");

function updateCurrentDisplay(json){
    const data = JSON.parse(json);
    currentTemperatureDisplay.innerHTML = data.temperature + "°C";
    currentHumidityDisplay.innerHTML = data.humidity + "%";
}

function requestUpdateCurrentDisplay(){
    httpGetAsync("/api/current", updateCurrentDisplay);
}

function updateHistoricalDisplay(json){
    const data = JSON.parse(json);
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

function requestUpdateHistoricalDisplay(){
    httpGetAsync("/api/lastWeek", updateHistoricalDisplay);
}

requestUpdateHistoricalDisplay();

window.setInterval(requestUpdateCurrentDisplay, 1000);