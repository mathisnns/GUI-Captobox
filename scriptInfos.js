function init() {
    checkDeviceType();

    document.body.style.display = "inline";

    if (location.hash === '#mono') {
        console.log("mono");
        document.getElementById("mono").style.display = "inline-block";
    }
    if (location.hash === '#co2') {
        console.log("co2");
        document.getElementById("co2").style.display = "inline-block";
    }
    if (location.hash === '#cov') {
        console.log("cov");
        document.getElementById("cov").style.display = "inline-block";
    }
    if (location.hash === '#pm') {
        console.log("pm")
        document.getElementById("pm").style.display = "inline-block";
    }
    if (location.hash === '#hum') {
        console.log("hum");
        document.getElementById("hum").style.display = "inline-block";
    }

    if (deviceType) {
        document.getElementById("phoneInfoMenu").style.display = "inline";
    } else {
        document.getElementById("pcInfoMenu").style.display = "inline";
    }
    loadImg();
}

function resizeImg(img) {
    img.height = (window.innerWidth / 2) - 250;
}

function locationHashChanged() {
    if (location.hash === '#mono1') {
        console.log("mono");
        erase();
        document.getElementById("mono").style.display = "inline-block";
        location.hash = "#mono";
    }
    if (location.hash === '#co21') {
        console.log("co2");
        erase();
        document.getElementById("co2").style.display = "inline-block";
        location.hash = "#co2";
    }
    if (location.hash === '#cov1') {
        console.log("cov");
        erase();
        document.getElementById("cov").style.display = "inline-block";
        location.hash = "#cov";
    }
    if (location.hash === '#pm1') {
        console.log("pm");
        erase();
        document.getElementById("pm").style.display = "inline-block";
        location.hash = "#pm";
    }
    if (location.hash === '#hum1') {
        console.log("hum");
        erase();
        document.getElementById("hum").style.display = "inline-block";
        location.hash = "#hum";
    }
}

window.onhashchange = locationHashChanged;

function erase() {
    var all = document.getElementsByClassName('content');
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}

function loadImg() {
    if (!deviceType) {
        var x = document.getElementById("img1");
        x.onerror = function(message, source, noligne, nocolonne, erreur) {
            console.log(message);
            displayError(message);
        }

        //charger les images les une apres les autres pour pas surcharger l'ESP 

        x.onload = function() {
            x = document.getElementById("img2");

            x.onload = function() {
                x = document.getElementById("img3");

                x.onload = function() {
                    x = document.getElementById("img4");
                    x.onload = function() {
                        x = document.getElementById("img5");
                        x.setAttribute("src", "src/humidity.jpg");
                    }
                    x.setAttribute("src", "src/pFines.jpg");
                }
                x.setAttribute("src", "src/cov.jpg");
            }
            x.setAttribute("src", "src/co2.jpg");
        };
        x.setAttribute("src", "src/mono.jpg");

    } else {
        var x = document.getElementById("img6");
        x.onerror = function(message, source, noligne, nocolonne, erreur) {
            console.log(message);
            displayError(message);
        }

        x.onload = function() {
            x = document.getElementById("img7");

            x.onload = function() {
                x = document.getElementById("img8");

                x.onload = function() {
                    x = document.getElementById("img9");
                    x.onload = function() {
                        x = document.getElementById("img10");
                        x.setAttribute("src", "src/humidity.jpg");
                    }
                    x.setAttribute("src", "src/pFines.jpg");
                }
                x.setAttribute("src", "src/cov.jpg");
            }
            x.setAttribute("src", "src/co2.jpg");
        };
        x.setAttribute("src", "src/mono.jpg");
    }
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