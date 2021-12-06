

var debug = true;

var temp;
var hum;
var press;
var co2;
var cov;
var mono;
var pm;

var test = "etst";

var optionsTemp = {};
var optionsCo2 = {};
var optionsMono = {};
var optionsHum = {};
var optionsCov = {};
var optionsPm = {};
var optionsPress = {};


var ready = true;
var nbValue;

var url;

function getJson(url, composant) {
    if (debug) { console.log("in the http request"); }
    ready = false;
    url = "data/" + url;
    if (debug) { console.log(url); }
    xmlhttp.open("GET", url, true);

    xmlhttp.onprogress = function(event) {
        //showProgress(event.loaded, event.total);
        console.log(event.loaded);
        console.log(event.total);
    };
    XMLHttpRequest.onprogress;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (composant == "mono") {
                mono = getValue(xmlhttp.responseText);
            }

            if (composant == "Co2") {
                co2 = getValue(xmlhttp.responseText);
            }

            if (composant == "cov") {
                cov = getValue(xmlhttp.responseText);
            }

            if (composant == "pm") {
                pm = getValue(xmlhttp.responseText);
            }

            if (composant == "temp") {
                temp = getValue(xmlhttp.responseText);
            }

            if (composant == "hum") {
                hum = getValue(xmlhttp.responseText);
            }

            if (composant == "press") {
                press = getValue(xmlhttp.responseText);
            }

            console.log("http done");

            ready = true;
        }
    };
    xmlhttp.send(null);
}

function getValue(httptext) {

    var list = [],
        data = [],
        i = 0;

    var stats = JSON.parse(httptext);

    var decallage = 0;

    while (i < nbValue) {
        string = "";

        string = i;

        //document.getElementById("progressBar").value = i;

        var variable = stats[string][0];

        if (!(variable == null)) {
            data[0] = stats[string][0] * 1000;
            data[1] = stats[string][1];
            list[i - decallage] = data;
        } else {
            decallage++;
        }

        data = [];
        i++;
    }
    if (debug) { console.log(list); }
    return list;
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}


function defineChartsOptions() {

    console.log("debut set option")

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var options1 = {
        tooltip: {
            enabled: true,
            followCursor: false,
            x: {
                format: 'dd/MM H:mm',
            },
            style: {
                fontSize: fontSize2,
            },
            fixed: {
                enabled: true,
                position: 'topRight',
                offsetX: 0,
                offsetY: 50,
            }
        },
        legend: {
            show: false,
            position: 'bottom',
            showForSingleSeries: true
        },
        series: [],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd/MM H:mm',
                rotate: -45,
                minHeight: XSize,
                maxHeight: XSize,
                rotateAlways: true,
                style: {
                    fontSize: fontSize
                }
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            show: true,
            seriesName: 'ndefined',
            labels: {
                style: {
                    fontSize: fontSize
                }
            }
        },
        title: {
            align: 'left',
            style: {
                fontSize: titleSize
            }
        },
        chart: {
            height: chartSize,
            width: '95%',
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'time',
                        headerValue: 'value',
                        dateFormatter(date) {
                            var d = new Date(date),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;

                            return [year, month, day].join('-');
                        }
                    },
                    svg: {
                        filename: undefined,
                    },
                    png: {
                        filename: undefined,
                    }
                }
            },
        }
    };

    if (debug) { console.log(options1); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var options = {
        series: [{
            name: "Temperature",
            data: temp
        }],
        title: {
            text: 'Température :'
        },
        chart: {
            id: 'temperature'
        },
        yaxis: {
            labels: {
                formatter: (val) => { return val.toFixed(2) },
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + ' °C'
                }
            }
        },
        yaxis: {
            min: 0,
        }
    };

    optionsTemp = {...options1, ...options };

    optionsTemp.chart = {...options1.chart, ...options.chart };
    optionsTemp.title = {...options1.title, ...options.title };
    optionsTemp.yaxis.labels = {...options1.yaxis.labels, ...options.yaxis.labels };
    optionsTemp.series = options.series;
    optionsTemp.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsTemp.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };

    if (debug) { console.log(optionsTemp); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {};

    options = {
        series: [{
            name: "Co2",
            data: co2
        }],
        title: {
            text: 'Dioxyde de carbon (CO2) :'
        },
        chart: {
            id: 'Co2'
        },
        annotations: {
            yaxis: [{
                y: 1500,
                y2: 8192,
                borderColor: '#000',
                fillColor: '#FF0000',
                opacity: 0.2,
            }, {
                y: 1500,
                strokeDashArray: 10,
                borderColor: '#DF0000',
                label: {
                    borderColor: '#DF0000', //8192
                    borderWidth: 10,
                    style: {
                        fontSize: fontSize,
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'seuil de danger',
                }
            }]
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + ' ppm'
                }
            }
        },
        yaxis: {
            min: 0,
        }
    };



    optionsCo2 = {...options1, ...options };

    optionsCo2.chart = {...options1.chart, ...options.chart };
    optionsCo2.title = {...options1.title, ...options.title };
    optionsCo2.series = options.series;
    optionsCo2.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsCo2.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };

    if (debug) { console.log(optionsCo2); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {
        series: [{
            name: "Mono",
            data: mono
        }],
        annotations: {
            yaxis: [{
                y: 50,
                y2: 600,
                borderColor: '#000',
                fillColor: '#FF0000',
                opacity: 0.2,
            }, {
                y: 50,
                strokeDashArray: 10,
                borderColor: '#DF0000',
                label: {
                    borderColor: '#DF0000',
                    borderWidth: 10,
                    style: {
                        fontSize: fontSize,
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'seuil de danger',
                }
            }]
        },
        title: {
            text: 'Monoxyde de carbon (Co) :'
        },
        yaxis: {
            forceNiceScale: true,
            labels: {
                formatter: (val) => { return val.toFixed(2) },
            },
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + ' ppm'
                }
            }
        },
        chart: {
            id: 'Co'
        }
    };

    optionsMono = {...options1, ...options };

    optionsMono.chart = {...options1.chart, ...options.chart };
    optionsMono.title = {...options1.title, ...options.title };
    optionsMono.series = options.series;
    optionsMono.yaxis.labels = {...options1.yaxis.labels, ...options.yaxis.labels };
    optionsMono.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsMono.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };

    if (debug) { console.log(optionsMono); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {
        series: [{
            name: "Humidité",
            data: hum
        }],
        title: {
            text: 'Humidité :'
        },
        chart: {
            id: 'Humidity'
        },
        annotations: {
            yaxis: [{
                    y: 60,
                    y2: 100,
                    borderColor: '#000',
                    fillColor: '#FF0000',
                    opacity: 0.2,
                },
                {
                    y: 0,
                    y2: 40,
                    borderColor: '#000',
                    fillColor: '#FF0000',
                    opacity: 0.2,
                }, {
                    y: 40,
                    strokeDashArray: 10,
                    borderColor: '#DF0000',
                    label: {
                        borderColor: '#DF0000', //8192
                        borderWidth: 10,
                        style: {
                            fontSize: fontSize,
                            color: '#fff',
                            background: '#FF0000',
                        },
                        text: 'seuil de danger',
                    }
                },
                {
                    y: 60,
                    strokeDashArray: 10,
                    borderColor: '#DF0000',
                    label: {
                        borderColor: '#DF0000', //8192
                        borderWidth: 10,
                        style: {
                            fontSize: fontSize,
                            color: '#fff',
                            background: '#FF0000',
                        },
                        text: 'seuil de danger',
                    }
                }
            ]
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + ' %'
                }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                formatter: (val) => { return val.toFixed(2) },
            },
        },
    };

    optionsHum = {...options1, ...options };

    optionsHum.chart = {...options1.chart, ...options.chart };
    optionsHum.title = {...options1.title, ...options.title };
    optionsHum.series = options.series;
    optionsHum.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsHum.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };


    if (debug) { console.log(optionsHum); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {
        series: [{
            name: "COV",
            data: cov
        }],
        title: {
            text: 'Composés Organiques Volatiles (COV) :'
        },
        chart: {
            id: 'COV'
        },
        annotations: {
            yaxis: [{
                y: 300,
                y2: 1187,
                borderColor: '#000',
                fillColor: '#FF0000',
                opacity: 0.2,
            }, {
                y: 300,
                strokeDashArray: 10,
                borderColor: '#DF0000',
                label: {
                    borderColor: '#DF0000', //8192
                    borderWidth: 10,
                    style: {
                        fontSize: fontSize,
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'seuil de danger',
                }
            }]
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + ' ppb'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => { return val },
            },
        },
    };

    optionsCov = {...options1, ...options };

    optionsCov.chart = {...options1.chart, ...options.chart };
    optionsCov.title = {...options1.title, ...options.title };
    optionsCov.series = options.series;
    optionsCov.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsCov.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };

    if (debug) { console.log(optionsCov); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {
        series: [{
            name: "PM",
            data: pm
        }],
        title: {
            text: 'Particules en suspention (PM) :'
        },
        chart: {
            id: 'particleMatter'
        },
        annotations: {
            yaxis: [{
                y: 30,
                y2: 600,
                borderColor: '#000',
                fillColor: '#FF0000',
                opacity: 0.2,
            }, {
                y: 30,
                strokeDashArray: 10,
                borderColor: '#DF0000',
                label: {
                    borderColor: '#DF0000', //8192
                    borderWidth: 10,
                    style: {
                        fontSize: fontSize,
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'seuil de danger',
                }
            }]
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2) + ' µg/M3'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => { return val.toFixed(2) },
            },
        },
    };

    optionsPm = {...options1, ...options };

    optionsPm.chart = {...options1.chart, ...options.chart };
    optionsPm.title = {...options1.title, ...options.title };
    optionsPm.series = options.series;
    optionsPm.tooltip = {...options1.tooltip, ...options.tooltip };
    optionsPm.tooltip.y = {...options1.tooltip.y, ...options.tooltip.y };

    if (debug) { console.log(optionsPm); }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    options = {
        series: [{
            name: "Pression",
            data: press
        }],
        title: {
            text: 'Préssion atmospherique :'
        },
        chart: {
            id: 'Pressure'
        }
    };

    optionsPress = {...options1, ...options };

    optionsPress.chart = {...options1.chart, ...options.chart };
    optionsPress.title = {...options1.title, ...options.title };
    optionsPress.series = options.series;

    if (debug) { console.log(optionsPress); }

    console.log("set option done");
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