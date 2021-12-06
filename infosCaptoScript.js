var windowSize = 0;

function init() {
    checkDeviceType();

    document.body.style.display = "inline";

    windowSize = window.innerWidth;


    if (location.hash === '#mq7') {
        console.log("mq7");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("mq7").style.display = "inline";
    }
    if (location.hash === '#cjmcu') {
        console.log("cjmcu");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("cjmcu").style.display = "inline";
    }
    if (location.hash === '#sharp') {
        console.log("sharp");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("sharp").style.display = "inline";
    }
    if (location.hash === '#wemos') {
        console.log("wemos")
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("wemos").style.display = "inline";
    }
    if (location.hash === '#modules') {
        console.log("modules");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("modules").style.display = "inline";


    }
    if (location.hash === '#screen') {
        console.log("screen");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("screen").style.display = "inline";
    }

    if (deviceType) {
        document.getElementById("phoneInfoMenu").style.display = "inline";
    } else {
        document.getElementById("pcInfoMenu").style.display = "inline";
    }

    loadImg();
}

init();

function locationHashChanged() {
    if (location.hash === '#mq71') {
        console.log("mq7");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("mq7").style.display = "inline";
        location.hash = "#mq7";
    }
    if (location.hash === '#cjmcu1') {
        console.log("cjmcu");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("cjmcu").style.display = "inline";
        location.hash = "#cjmcu";
    }
    if (location.hash === '#sharp1') {
        console.log("sharp");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("sharp").style.display = "inline";
        location.hash = "#sharp";
    }
    if (location.hash === '#wemos1') {
        console.log("wemos")
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("wemos").style.display = "inline";
        location.hash = "#wemos";
    }
    if (location.hash === '#modules1') {
        console.log("modules");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("modules").style.display = "inline";
        location.hash = "#modules";
    }
    if (location.hash === '#screen1') {
        console.log("screen");
        document.getElementById("captoImg").style.display = 'none';
        erase();
        document.getElementById("screen").style.display = "inline";
        location.hash = "#screen";
    }


}

function resizeImg(img) {
    img.width = (windowSize / 2) - 10;
    console.log(windowSize / 2 - 10);
    console.log(window.innerWidth);
}

function erase() {
    var all = document.getElementsByClassName('content');
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}

window.onhashchange = locationHashChanged;


function loadImg() {
    if (!deviceType) {
        var x = document.getElementById("img1");
        x.onerror = function(message, source, noligne, nocolonne, erreur) {
            console.log(message);
            displayError(message);
        }

        x.onload = function() {
            x = document.getElementById("img2");

            x.onload = function() {
                x = document.getElementById("img3");

                x.onload = function() {
                    x = document.getElementById("img4");
                    x.onload = function() {
                        x = document.getElementById("img5");
                        x.onload = function() {
                            x = document.getElementById("img6");

                            x.setAttribute("src", "src/sharp_sensor.jpg");
                        }
                        x.setAttribute("src", "src/mq7.jpg");
                    }
                    x.setAttribute("src", "src/CJMCU-8128.jpg");
                }
                x.setAttribute("src", "src/ds3231_and_sd.png");
            }
            x.setAttribute("src", "src/screen.png");
        };
        x.setAttribute("src", "src/wemos_mega.JPG");

    } else {
        var x = document.getElementById("img7");
        x.onerror = function(message, source, noligne, nocolonne, erreur) {
            console.log(message);
            displayError(message);
        }
        resizeImg(x);

        x.onload = function() {
            x = document.getElementById("img8");
            resizeImg(x);

            x.onload = function() {
                x = document.getElementById("img9");
                resizeImg(x);

                x.onload = function() {
                    x = document.getElementById("img10");
                    resizeImg(x);
                    x.onload = function() {
                        x = document.getElementById("img11");
                        resizeImg(x);
                        x.onload = function() {
                            x = document.getElementById("img12");
                            resizeImg(x);

                            x.setAttribute("src", "src/sharp_sensor.jpg");
                        }
                        x.setAttribute("src", "src/mq7.jpg");
                    }
                    x.setAttribute("src", "src/CJMCU-8128.jpg");
                }
                x.setAttribute("src", "src/ds3231_and_sd.png");
            }
            x.setAttribute("src", "src/screen.png");
        };
        x.setAttribute("src", "src/wemos_mega.JPG");
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