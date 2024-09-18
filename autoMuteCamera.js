console.log("Auto mute cam and mic for 5 seconds");
let times = 0;
let autoMuteCamera = setInterval(() => {
    if (times++ > 10) {
        console.log("cam and mic will not be mute again");
        clearInterval(autoMuteCamera);
    }
    
    document.querySelectorAll('div[data-is-muted="false"]').forEach(div => div.click());
}, 500);
