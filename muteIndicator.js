let previousIndicator = true;

const muteIndicator = setInterval(() => {
    const muteButtons = document.querySelectorAll('button[data-is-muted]');

    if (muteButtons && muteButtons[0]) {
        if (muteButtons[0].getAttribute("data-is-muted") == 'true') {
            document.querySelectorAll('div[jsname]')[0].style.backgroundColor = "red"; 
            document.querySelectorAll('div[data-is-auto-rejoin]')[0].style.backgroundColor = "red";
            if (previousIndicator) {
                previousIndicator = false;
                console.log("Mic close. The background is red now");
            }        
        } else {
            document.querySelectorAll('div[jsname]')[0].style.backgroundColor = "";
            document.querySelectorAll('div[data-is-auto-rejoin]')[0].style.backgroundColor = "";
            if (!previousIndicator) {
                previousIndicator = true;
                console.log("Mic open. The background is normal now");
            }
        }
        }
}, 500);
