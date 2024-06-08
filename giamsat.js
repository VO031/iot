// Khởi tạo Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDYd5jO14_dVM_VTG0-P0m4uCzYRBqheYg",
    authDomain: "iot1-5dea0.firebaseapp.com",
    databaseURL: "https://iot1-5dea0-default-rtdb.firebaseio.com",
    projectId: "iot1-5dea0",
    storageBucket: "iot1-5dea0.appspot.com",
    messagingSenderId: "1092996136822",
    appId: "1:1092996136822:web:127ffa014f0be36225c457",
    measurementId: "G-EDQR1Q6543",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Biểu đồ Nhiệt độ
var temperatureChart = new Chart(document.getElementById('temperatureChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nhiệt Độ',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'second'
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    stepSize: 10
                },
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.2)'
                }
            }]
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 20,
                padding: 15
            }
        },
        tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: function(tooltipItem) {
                    return 'Nhiệt Độ: ' + tooltipItem.yLabel + '°C';
                }
            }
        }
    }
});

// Biểu đồ Độ ẩm
var humidityChart = new Chart(document.getElementById('humidityChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Độ Ẩm',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'second'
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    stepSize: 10
                },
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.2)'
                }
            }]
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 20,
                padding: 15
            }
        },
        tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: function(tooltipItem) {
                    return 'Độ Ẩm: ' + tooltipItem.yLabel + '%';
                }
            }
        }
    }
});

// Biểu đồ Khí gas
var gasChart = new Chart(document.getElementById('gasChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Gas',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'second'
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    min: 0,
                    max: 1000,
                    stepSize: 100
                },
                gridLines: {
                    color: 'rgba(200, 200, 200, 0.2)'
                }
            }]
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 20,
                padding: 15
            }
        },
        tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: function(tooltipItem) {
                    return 'Gas: ' + tooltipItem.yLabel + ' ppm';
                }
            }
        }
    }
});
// Lắng nghe sự thay đổi của nhiệt độ
database.ref("IOT/Nhiet do").on("value", function(snapshot) {
    var temp = snapshot.val();
    var now = new Date();
    var time = now.toLocaleString(); // Lấy ngày giờ hiện tại dưới dạng chuỗi

    temperatureChart.data.labels.push(time);
    temperatureChart.data.datasets[0].data.push(temp);
    temperatureChart.update();
});

// Lắng nghe sự thay đổi của độ ẩm
database.ref("IOT/Do am").on("value", function(snapshot) {
    var humidity = snapshot.val();
    var now = new Date();
    var time = now.toLocaleString(); // Lấy ngày giờ hiện tại dưới dạng chuỗi

    humidityChart.data.labels.push(time);
    humidityChart.data.datasets[0].data.push(humidity);
    humidityChart.update();
});

// Lắng nghe sự thay đổi của khí gas
database.ref("IOT/Gas").on("value", function(snapshot) {
    var gas = snapshot.val();
    var now = new Date();
    var time = now.toLocaleString(); // Lấy ngày giờ hiện tại dưới dạng chuỗi

    gasChart.data.labels.push(time);
    gasChart.data.datasets[0].data.push(gas);
    gasChart.update();
});
