console.log("demarrage");



function initBody() {
    checkDeviceType();

    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "deviceType.js";

    head.appendChild(script);

    if (location.hash === '#avertissement') {
        //console.log("warning displayed")
        document.getElementById("avertissement").style.display = "inline";
    }
    if (location.hash === '#close') {
        //console.log("warning closed")
        document.getElementById("avertissement").style.display = "none";
    }
    console.log("in mesure init ")

    document.getElementById("circle").style.display = "none";
}

function locationHashChanged() {
    //console.log("location has changed")
    if (location.hash === '#avertissement') {
        //console.log("warning displayed")
        document.getElementById("avertissement").style.display = "inline";
    }
    if (location.hash === '#close') {
        //console.log("warning closed")
        document.getElementById("avertissement").style.display = "none";
    }
}

window.onhashchange = locationHashChanged;

var mono = 0,
    co2 = 0,
    cov = 0,
    pf = 0,
    temp = 0,
    hum = 0,
    press = 0,
    done = false;

function getData() {

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };
        xhr.send();
    };

    getJSON('/data/stats_Now.json', function(err, data) {
        if (err != null) {
            console.error(err);
        } else {
            mono = data.Mono;
            //console.log("mono = " + mono);

            co2 = data.Co2;
            //console.log("co2 = " + co2);

            cov = data.Cov;
            //console.log("cov = " + cov);

            pf = data.Pm;
            //console.log("pf = " + pf);

            temp = data.Temp;
            //console.log("temp = " + temp);
            document.getElementById('temp').innerHTML = temp + "°C";

            hum = data.Hum;
            //console.log("hum = " + hum);
            document.getElementById('hum').innerHTML = hum + "%";

            press = data.Pres;
            //console.log("press = " + press);
            document.getElementById('press').innerHTML = press + "HPa";

            done = true;
        }
    });
}

function createChart(name, data, chartName, units, max) {
    //define the size according to the device type 
    if (deviceType) {
        console.log(window.innerWidth);
        var size = (window.innerWidth / 2 - 10);
        console.log(size);
        var size1 = (window.innerWidth / 2) + 100;
    } else {
        var size = 350;
        var size1 = size;
    }
    //set color of the chart
    if (data < (max / 2)) {
        var color = "#00FF00";
    } else if (data < ((max / 4) * 3)) {
        var color = "#FFFF00";
    } else {
        {
            color = "#FF0000";
        }
    }

    var dataCircle = (100 * data) / max;

    var options = {
        chart: {
            height: size1,
            width: size,
            type: "radialBar"
        },

        series: [dataCircle],
        colors: [color],

        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "70%"
                },

                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -(size / 15),
                        show: true,
                        color: "#888",
                        fontSize: (size / 20 + "px")
                    },
                    value: {
                        color: "#111",
                        fontSize: (size / 8 + "px"),
                        show: true,
                        formatter: function() {
                            return data + units
                        }
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: [name]
    };
    var chart = new ApexCharts(document.querySelector(chartName), options);
    chart.render();
}
console.log("declaration faites");
getData();
console.log("get data appelée");

function pollDOM() {
    if (done) {




        console.log("create appelé");
    } else {
        setTimeout(pollDOM, 300); // try again in 300 milliseconds
    }
}

pollDOM();

function launchPage() {
    console.log("in launch");
    console.log(launch);
    if (launch) {

        console.log("launching");

        createChart("Monoxyde de carbone", mono, "#chartMono", " ppm", 50);
        createChart("Dioxyde de carbone", co2, "#chartCo2", " ppm", 1500);
        createChart("Composés organiques volatiles", cov, "#chartCov", " ppb", 300);
        createChart("Particules en suspention", pf, "#chartPFines", " µg/m3", 30);

        var all = document.getElementsByClassName('hidden');
        for (var i = 0; i < all.length; i++) {
            all[i].style.display = 'block';
        }
        document.getElementById("circle").style.display = "none";

    } else {
        setTimeout(launchPage, 300); // try again in 300 milliseconds
    }
}

launchPage();



function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

/*
        .
       ":"
     ___:____     |"\/"|
   ,'        `.    \  /
   |  O        \___/  |
 ~^~^~^~^~^~^~^~^~^~^~^~^~

      By MathisNns

*/