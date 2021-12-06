var xmlhttp = new XMLHttpRequest();

var code = 0;
var day = 0;
var composant;


var chartCo2;
var chartHum;
var chartCov;
var chartPm;
var chartMono;


var display = false;

var progress = 0;

var displayData = false;

function init() {
	checkDeviceType();

	if (location.hash === '#1jour') {
		day = 1;
		url = "24hours/24hStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 24 heures :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 24 heures :";
		}
	}

	else if (location.hash === '#3jours') {
		console.log("3 jours");
		day = 3;
		url = "3days/3daysStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 3 jours :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 3 jours :";
		}
	}

	else if (location.hash === '#7jours') {
		console.log("7 jours");
		day = 7;
		url = "7days/7daysStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 7 jours :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 7 jours :";
		}
	}
	else{
		location.hash = "";
	}



	document.getElementById("circle").style.display = "none";

	console.log(window.innerWidth);
}

function locationHashChanged() {
	if (location.hash === '#1jour') {
		day = 1;
		url = "24hours/24hStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 24 heures :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 24 heures :";
		}
	}

	if (location.hash === '#3jours') {
		console.log("3 jours");
		day = 3;
		url = "3days/3daysStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 3 jours :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 3 jours :";
		}
	}

	if (location.hash === '#7jours') {
		console.log("7 jours");
		day = 7;
		url = "7days/7daysStats";
		nbValue = 72;
		if (deviceType) {
			document.getElementById("boutonComposant").style.display = "block";
			document.getElementById("indicateur").textContent = "Relevé sur 7 jours :";
		} else {
			displayCharts();
			document.getElementById("indicateur").textContent = "Relevé sur 7 jours :";
		}
	}

	if ((location.hash == '#1jour' || location.hash == '#3jours' || location.hash == '#7jours') && (!deviceType)) {
		document.getElementById("indicateur").style.display = "inline-block";
		document.getElementById("courbes").style.display = "inline";
		document.getElementById("boutonHistorique").style.display = "none";
		document.getElementById("boutonRetour").style.display = "inline";
	}

	if (location.hash === '#temp') {
		composant = "temp";
		displayCharts();
	}

	if (location.hash === '#pm') {
		composant = "pm";
		displayCharts();
	}

	if (location.hash === '#hum') {
		composant = "hum";
		displayCharts();
	}

	if (location.hash === '#mono') {
		composant = "mono";
		displayCharts();
	}

	if (location.hash === '#co2') {
		composant = "co2";
		displayCharts();
	}

	if (location.hash === '#cov') {
		composant = "cov";
		//getStats();
		displayCharts();
	}

	if (location.hash === '#press') {
		composant = "press";
		displayCharts();
	}

	if (location.hash == '#temp' || location.hash == '#hum' || location.hash == '#pm' || location.hash == '#mono' || location.hash == '#co2' || location.hash == '#cov' || location.hash == '#press') {
		document.getElementById("boutonComposant").style.display = "none";
		document.getElementById("indicateur").style.display = "inline";
		document.getElementById("courbes").style.display = "inline";
		document.getElementById("boutonHistorique").style.display = "none";
		document.getElementById("boutonRetour").style.display = "inline-block";
	}

	//avertissement section

	if (location.hash === '#avertissement') {
		console.log("test")
		document.getElementById("avertissement").style.display = "inline-block";
	}

	if (location.hash === '#close') {
		console.log("fermer")
		document.getElementById("avertissement").style.display = "none";
	}
}

window.onhashchange = locationHashChanged;

function displayCharts() {
	console.log("in display charts");
	if (ready) {

		if (code < 7 && composant == undefined) {

			console.log(code);

			progress += 100 / 7;
			document.getElementById("progressPourcentage").innerHTML = progress.toFixed(0) + '%';

			console.log("in display charts 2");


			if (code == 0) {
				//url += "Mono.json";
				//document.getElementById("progress").value = "1";
				getJson(url + "Mono.json", "mono");
			}

			if (code == 1) {
				//url += "Co2.json";
				//document.getElementById("progress").value = "2";
				getJson(url + "Co2.json", "Co2");
			}

			if (code == 2) {
				//url += "Cov.json";
				//document.getElementById("progress").value = "3";
				getJson(url + "Cov.json", "cov");
			}

			if (code == 3) {
				//url += "Pm.json";
				//document.getElementById("progress").value = "4";
				getJson(url + "Pm.json", "pm");
			}

			if (code == 4) {
				//url += "Temp.json";
				//document.getElementById("progress").value = "4";
				getJson(url + "Temp.json", "temp");
			}

			if (code == 5) {
				//url += "Hum.json";
				//document.getElementById("progress").value = "4";
				getJson(url + "Hum.json", "hum");
			}

			if (code == 6) {
				//url += "Press.json";
				//document.getElementById("progress").value = "4";
				getJson(url + "Pres.json", "press");
			}

			code++;

			setTimeout(displayCharts, 50); // try again in 300 milliseconds

			return 0;
		}

		if (code == 7) {
			console.log(code + "display true");
			display = true;
		}

		if (composant == "mono" && !display) {
			url += "Mono.json";
			document.getElementById("progress").value = "1";
			getJson(url, "mono");
			code = 7;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "co2" && code < 8) {
			url += "Co2.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "Co2");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "cov" && code < 8) {
			url += "Cov.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "cov");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "pm" && code < 8) {
			url += "Pm.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "pm");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "temp" && code < 8) {
			url += "Temp.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "temp");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "hum" && code < 8) {
			url += "Hum.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "hum");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}
		if (composant == "press" && code < 8) {
			url += "Pres.json";
			//document.getElementById("progress").value = "1";
			getJson(url, "press");
			code = 8;
			display = true;
			setTimeout(displayCharts, 50); // try again in 300 milliseconds
			return 0;
		}

		if (typeof (composant) !== 'undefined') {

		}

		if (display) {
			console.log("in display");

			document.getElementById("boutonHistorique").style.display = "none";
			//document.getElementById("boutonRetour").style.display = "inline";
			document.getElementById("progress").style.display = "none";
			document.getElementById("chartsDiv").style.display = "inline";
			document.getElementById("zonededanger").style.display = "inline-block";

			if (deviceType) {
				document.getElementById("mobile").style.display = "inline-block";
			}

			defineChartsOptions();

			if (composant == "temp" || (!deviceType)) {
				document.getElementById("chartTempCanva").style.display = "inline";
				var chartTemp = new ApexCharts(document.querySelector("#chartTemp"), optionsTemp);
				chartTemp.render();
			}

			if (composant == "hum" || (!deviceType)) {
				document.getElementById("chartHumCanva").style.display = "inline";
				chartHum = new ApexCharts(document.querySelector("#chartHum"), optionsHum);
				chartHum.render();
			}

			if (composant == "co2" || (!deviceType)) {
				console.log("chart rendered");
				document.getElementById("chartCo2Canva").style.display = "inline";
				chartCo2 = new ApexCharts(document.querySelector("#chartCo2"), optionsCo2);
				chartCo2.render();
				console.log("chart rendered");
			}

			if (composant == "mono" || (!deviceType)) {
				document.getElementById("chartMonoCanva").style.display = "inline";
				chartMono = new ApexCharts(document.querySelector("#chartMono"), optionsMono);
				chartMono.render();
			}

			if (composant == "pm" || (!deviceType)) {
				document.getElementById("chartPmCanva").style.display = "inline";
				chartPm = new ApexCharts(document.querySelector("#chartPm"), optionsPm);
				chartPm.render();
			}

			if (composant == "cov" || (!deviceType)) {
				document.getElementById("chartCovCanva").style.display = "inline";
				chartCov = new ApexCharts(document.querySelector("#chartCov"), optionsCov);
				chartCov.render();
			}

			if (composant == "press" || (!deviceType)) {
				document.getElementById("chartPressCanva").style.display = "inline";
				var chartPress = new ApexCharts(document.querySelector("#chartPress"), optionsPress);
				chartPress.render();
			}
		}
	} else {
		console.log("time out");
		setTimeout(displayCharts, 50); // try again in 300 milliseconds
	}
}

function showZone() {
	elt = document.getElementById("showZone");
	console.log("zone = " + elt.checked);

	if (!elt.checked) {
		var newOptions = {
			annotations: {
				yaxis: []
			}
		};
		if (!deviceType) {
			chartCo2.updateOptions(newOptions);
			chartCov.updateOptions(newOptions);
			chartHum.updateOptions(newOptions);
			chartPm.updateOptions(newOptions);
			chartMono.updateOptions(newOptions);
		}
		if (composant == "co2") {
			chartCo2.updateOptions(newOptions);
		}
		if (composant == "cov") {
			chartCov.updateOptions(newOptions);
		}
		if (composant == "hum") {
			chartHum.updateOptions(newOptions);
		}
		if (composant == "pm") {
			chartPm.updateOptions(newOptions);
		}
		if (composant == "mono") {
			chartMono.updateOptions(newOptions);
		}

	} else {
		if (!deviceType) {
			chartCo2.updateOptions({
				annotations: optionsCo2.annotations
			});
			chartCov.updateOptions({
				annotations: optionsCov.annotations
			});
			chartHum.updateOptions({
				annotations: optionsHum.annotations
			});
			chartMono.updateOptions({
				annotations: optionsMono.annotations
			});
			chartPm.updateOptions({
				annotations: optionsPm.annotations
			});
		}

		if (composant == "co2") {
			chartCo2.updateOptions({
				annotations: optionsCo2.annotations
			});
		}
		if (composant == "co2") {
			chartCov.updateOptions({
				annotations: optionsCo2.annotations
			});
		}
		if (composant == "hum") {
			chartHum.updateOptions({
				annotations: optionsHum.annotations
			});
		}
		if (composant == "mono") {
			chartMono.updateOptions({
				annotations: optionsMono.annotations
			});
		}
		if (composant == "pm") {
			chartPm.updateOptions({
				annotations: optionsPm.annotations
			});
		}
	}
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

//test test