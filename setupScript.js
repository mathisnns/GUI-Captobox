function initPage() {
    location.hash = "#";

    checkDeviceType();

    document.body.style.display = "inline";
}

window.onhashchange = locationHashChanged;

function locationHashChanged() {

    if (location.hash === '#1') {
        document.getElementById("info1").style.display = "inline";
        document.getElementById("info1link").href = "#close1";
    }
    if (location.hash === '#2') {
        document.getElementById("info2").style.display = "inline";
        document.getElementById("info2link").href = "#close2";
    }
    if (location.hash === '#3') {
        document.getElementById("info3").style.display = "inline";
        document.getElementById("info3link").href = "#close3";
    }
    if (location.hash === '#4') {
        document.getElementById("info4").style.display = "inline";
        document.getElementById("info4link").href = "#close4";
    }
    if (location.hash === '#5') {
        document.getElementById("info5").style.display = "inline";
        document.getElementById("info5link").href = "#close5";
    }
    if (location.hash === '#6') {
        document.getElementById("info6").style.display = "inline";
        document.getElementById("info6link").href = "#close6";
    }


    if (location.hash === '#close1') {
        document.getElementById("info1").style.display = "none";
        document.getElementById("info1link").href = "#1";
    }
    if (location.hash === '#close2') {
        document.getElementById("info2").style.display = "none";
        document.getElementById("info2link").href = "#2";
    }
    if (location.hash === '#close3') {
        document.getElementById("info3").style.display = "none";
        document.getElementById("info3link").href = "#3";
    }
    if (location.hash === '#close4') {
        document.getElementById("info4").style.display = "none";
        document.getElementById("info4link").href = "#4";
    }
    if (location.hash === '#close5') {
        document.getElementById("info5").style.display = "none";
        document.getElementById("info5link").href = "#5";
    }
    if (location.hash === '#close6') {
        document.getElementById("info6").style.display = "none";
        document.getElementById("info6link").href = "#6";
    }
}


var xh_serveur = new XMLHttpRequest();
var ssid;
var i;
var x;
var mode = false;

function affiche_liens(name) {
    var myBodyId = document.getElementById("wifilist");
    var optionWifi = document.createElement('option');
    optionWifi.setAttribute('value', name);
    optionWifi.innerHTML = name;

    myBodyId.appendChild(optionWifi);
}

function send_ssid() {
    var selectElem = document.getElementById('wifilist');

    var index = selectElem.selectedIndex;

    var nom = selectElem.options[index].value;

    console.log(nom);

    document.getElementById("reseau").value = nom;

    document.getElementById("mdp").focus();
    document.getElementById("mdp").value = "";
}

function scan() {
    xh_serveur.open("GET", "scan.json", true);
    xh_serveur.onreadystatechange = function() {
        if (xh_serveur.readyState == 4) {
            if (xh_serveur.status == 200) {
                var res = JSON.parse(xh_serveur.responseText);
                console.log(res);
                x = "";
                document.getElementById('listetext').style.display = "inline-block";
                for (i = 0; i < res.length; i++) {
                    x = res[i].ssid;
                    console.log(x)
                    affiche_liens(x);
                }
            }
        }
    }
    xh_serveur.send(null);

}

function access_point() {
    document.getElementById('networked_box').style.display = "none";
    document.getElementById('acces_point_box').style.display = "block";
    document.getElementById('writeConfig').style.display = "block";
    document.getElementById('scan').style.display = "none";
    document.getElementById("mode").innerHTML = "Captobox en point d'accès :";
    mode = false;
}

function networked() {
    console.log("in the networked func");

    document.getElementById('acces_point_box').style.display = "none";
    document.getElementById('networked_box').style.display = "block";
    document.getElementById('writeConfig').style.display = "block";
    document.getElementById('scan').style.display = "block";
    document.getElementById("mode").innerHTML = "Captobox dans un reseau existant :";
    mode = true;
    //scan();
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function write_config() {

    var mdp = document.getElementById('mdp').value;

    if ((mdp.length < 8 || mdp == "password") && mode == "networked") {
        window.confirm("Le mot de passe rentré n'est pas correct");
        return 0;
    }

    if (mode == false) {
        if (window.confirm("La Captobox va redemarrer pour applique ces parametres, vous allez être déconnecté.")) {
            var ssid = document.getElementById('reseau').value;
            var mdp = document.getElementById('mdp').value;
            var canal = document.getElementById('canal').value;
            var name = document.getElementById('name').value;
            var ip = document.getElementById('ip').value;
            var post_config = 'write?name=' + name + '&mode=' + mode + '&ssid=' + ssid + '&mdp=' + mdp + '&canal=' + canal + '&ip=' + ip;
            xh_serveur.open("GET", post_config, true);
            xh_serveur.onreadystatechange = function() {

            };
            xh_serveur.send(null);
        }
    }
    if (mode == true) {
        if (window.confirm("La Captobox va tenter de se connecter a ce reseau wifi, vous allez être déconnecté.")) {
            var ssid = document.getElementById('reseau').value;
            var mdp = document.getElementById('mdp').value;
            var canal = document.getElementById('canal').value;
            var name = document.getElementById('name').value;
            var ip = document.getElementById('ip').value;
            var post_config = 'write?name=' + name + '&mode=' + mode + '&ssid=' + ssid + '&mdp=' + mdp + '&canal=' + canal + '&ip=' + ip;
            xh_serveur.open("GET", post_config, true);
            xh_serveur.onreadystatechange = function() {

            };
            xh_serveur.send(null);
        }
    }
}

function load_config() {
    xh_serveur.open("GET", "config.json", true);
    xh_serveur.onreadystatechange = function() {
        if (xh_serveur.readyState == 4) {
            if (xh_serveur.status == 200) {
                var res = JSON.parse(xh_serveur.responseText);
                console.log(res);
                
                document.getElementById('canal').value = res.Canal
                document.getElementById('name').value = res.Name;
                document.getElementById('ip').value = res.IPAddress;
                document.getElementById('reseau').value = res.SSID;
                //document.getElementById('mdp').value = res.mdp;

                if (res.Mode == false) {
                    access_point();
                } else {
                    networked();
                }
            }
        }
    };
    xh_serveur.send(null);
}

function launchPage() {
	console.log("in launch");
	console.log(launch);
	if (launch) {

		console.log("launching");

        

		var all = document.getElementsByClassName('hidden');
		for (var i = 0; i < all.length; i++) {
			all[i].style.display = 'block';
		}
		document.getElementById("circle").style.display = "none";

        

		initPage();

        load_config();

	} else {
		setTimeout(launchPage, 300); // try again in 300 milliseconds
	}
}

launchPage();


/*
        .
       ":"
     ___:____     |"\/"|
   ,'        `.    \  /
   |  O        \___/  |
 ~^~^~^~^~^~^~^~^~^~^~^~^~

      By MathisNns

*/