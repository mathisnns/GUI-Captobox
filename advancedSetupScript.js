
function playVid() {
    var vid = document.getElementById("video");
    vid.play();
    location.hash = "#video";
}

function init() {
    location.hash = "#";

    loadInformations();

    checkDeviceType();
}

function write_config() {
    var all = document.getElementsByClassName('change');
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
    document.getElementById("change button").style.display = "inline";
    document.getElementById("save button").style.display = "none";


    if (window.confirm("La Captobox va appliquer les changements, vous allez être déconnecté.")) {
        var RTC_date = document.getElementById('RTC_date').value;
        var RTC_time = document.getElementById('RTC_time').value;
        var FTP_ID = document.getElementById('FTP_ID').value;
        var FTP_PWD = document.getElementById('FTP_PWD').value;
        var serverAddress = document.getElementById('serverAddress').value;
        var OTA_ID = document.getElementById('OTA_ID').value;
        var OTA_PWD = document.getElementById('OTA_PWD').value;
        var owner = document.getElementById('owner').value;
        var key = document.getElementById('key').value;

        var post_config = '/write?=RTC_date' + RTC_date + '&RTC_time=' + RTC_time + '&FTP_ID=' + FTP_ID + '&FTP_PWD=' + FTP_PWD + '&serverAddress=' + serverAddress + '&OTA_ID=' + OTA_ID + '&OTA_PWD=' + OTA_PWD + '&owner=' + owner + '&key=' + key;
        xh_serveur.open("GET", post_config, true);
        xh_serveur.onreadystatechange = function() {

        };
        xh_serveur.send(null);
    }
}

function locationHashChanged() {
    if (location.hash === '#42') {
        document.getElementById("video").style.display = 'inline';
        playVid();
    }
}

window.onhashchange = locationHashChanged;

function loadInformations() {
    var data;
    var xh_serveur = new XMLHttpRequest();
    xh_serveur.open("GET", "data/config.json", true);
    xh_serveur.onreadystatechange = function() {
        if (xh_serveur.readyState == 4) {
            if (xh_serveur.status == 200) {
                data = JSON.parse(xh_serveur.responseText);
                console.log(data);
                document.getElementById('deviceType').innerHTML = device();
                document.getElementById('currentTime').innerHTML = data.RTCvalue;
                document.getElementById('currentFTP_ID').innerHTML = "FTP ID : " + data.FTPID;
                document.getElementById('currentFTP_PWD').innerHTML = "FTP password : " + data.FTPPassword;
                document.getElementById('currentServeur').innerHTML = "Serveur : " + data.NTPServer;
                document.getElementById('currentOTA_ID').innerHTML = "OTA ID : " + data.OTAID;
                document.getElementById('currentOTA_PWD').innerHTML = "OTA password : " + data.OTAPassword;
                document.getElementById('currentOwner').innerHTML = "Owner :  " + data.owner;
                document.getElementById('currentKey').innerHTML = "Key : " + data.ownerKey;
            }
        }
    };
    xh_serveur.send(null);
}

function device() {
    if (deviceType) {
        return "Mobile"
    } else {
        return "PC"
    }
}

function change_value() {
    var all = document.getElementsByClassName('change');
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'inline';
    }
    document.getElementById("change button").style.display = "none";
    document.getElementById("save button").style.display = "inline";
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