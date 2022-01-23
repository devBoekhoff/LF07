const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];
const chartoptions = {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0.1)",
            data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{ticks: {min: 6, max:16}}],
        }
    }
}

let temperatureChart = new Chart("temperature", chartoptions);
let humidityChart = new Chart("humidity", chartoptions);