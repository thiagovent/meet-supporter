let inCallCountToEnableAutoLeave = 6;

let autoLeavingEnabled = false;
let autoLeaveButton = null;

function leaveMeeting() {
    document.querySelectorAll("i").forEach(i => {
        if (i.innerText === 'call_end') {
            console.log("Leaving meeting");
            i.click();
        }
    });
}

let maxParticipants = 0;
const checkEnd = setInterval(() => {
    let currentParticipants = 0;
    let foundByIcon = false;

    document.querySelectorAll("i").forEach(i => {
        if (i.innerText === "people") {
            const parentElement = i.parentElement.parentElement.parentElement;

            currentParticipants = parseInt(parentElement.children[1].innerText);
            if (isNaN(currentParticipants)) {
                currentParticipants = parseInt(parentElement.parentElement.children[1].innerText);
            }

            foundByIcon = !isNaN(currentParticipants);
        }
    });

    if (!foundByIcon) {
        document.querySelectorAll("div").forEach(div => {
            if (div.innerHTML === 'Colaboradores' || div.innerHTML === 'Contributors') { 
                currentParticipants = parseInt(div.parentElement.children[1].innerText);
            }
        });
    }

    if (currentParticipants > inCallCountToEnableAutoLeave && autoLeaveButton == null) {
        console.log(`Meeting has reached ${inCallCountToEnableAutoLeave} people in call. Enabling auto leave.`)
        createAutoCloseButton();
    }

    if (currentParticipants > maxParticipants) {
        maxParticipants = currentParticipants;
        console.log(`max people in meeting: ${maxParticipants}`);
    } else if (autoLeavingEnabled && currentParticipants < (maxParticipants / 2)) {
        leaveMeeting();
    }
}, 1000);

function createAutoCloseButton() {
    const callEndButton = [...document.querySelectorAll('button')].find(button => button.innerText === 'call_end');
    
    if (callEndButton) {
        const parentDiv = callEndButton.parentElement.parentElement;
        const clonedDiv = parentDiv.cloneNode(true);
        autoLeaveButton = clonedDiv.querySelector('button');
        const icon = autoLeaveButton.querySelector('i');
        
        if (icon) {
            icon.innerText = 'phone_missed';
            icon.classList.add('material-symbols-outlined');
        }

        const tooltip = clonedDiv.querySelector('div[role="tooltip"]');
        if (tooltip) tooltip.innerText = 'Leave call automatically';

        autoLeaveButton.style.backgroundColor = '#0096FF';
        autoLeaveButton.style.color = 'white';

        parentDiv.parentElement.appendChild(clonedDiv);

        autoLeaveButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            autoLeavingEnabled = !autoLeavingEnabled;
            autoLeaveButton.style.backgroundColor = autoLeavingEnabled ? '#0096FF' : 'rgb(60, 64, 67)';
            console.log(autoLeavingEnabled ? "Auto leaving is enable" : "Auto leaving is disable");
        });

        autoLeavingEnabled = true;
    }
}
