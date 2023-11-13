
const fiveSecond = document.querySelector('.timeOption.s5');
const tenSecond = document.querySelector('.timeOption.s10');
const twentySecond = document.querySelector('.timeOption.s20');
const thirtySecond = document.querySelector('.timeOption.s30');
const sixtySecond = document.querySelector('.timeOption.s60');
const AllOptions = document.querySelectorAll('.timeOption');
const timeContainer = document.getElementById('time-container');
const ClickSubject = document.getElementById('ClickSubject');
const clickCount = document.querySelector('#ClickCounter')
let clickCounter = parseInt(clickCount.textContent)
let activeOption = null;
let initialTime = 0;
let timerRunning = false;
let countdownInterval = null; 
const theSummary = document.getElementById('theSummary')
document.querySelector('summary').style.display = 'flex';
document.querySelector('summary').style.display = 'none';


function GetClicksPerSecond() {
    // Check if there's an active option
    if (activeOption) {
        // Get the initial time from the active option
        initialTime = parseInt(activeOption.textContent);

        // Calculate clicks per second
        let ClicksPerSecond = clickCounter / initialTime;

        // Return the result
        return ClicksPerSecond;
    } else {
        // Handle the case when there's no active option
        console.error('No active option selected.');
        return 0; // Or some default value
    }
}
function updateSummary() {
    const summaryElement = document.getElementById('Thesummary');
    const clicksPerSecond = GetClicksPerSecond();
    summaryElement.textContent = `You did a total of ${clicksPerSecond} clicks per second.`;
}

function ShowSummary(){
    const Summary = document.querySelector('summary')
    Summary.style.display = 'block'
    Summary.style.display = 'flex'; 
}
function HideSummary(){
    const HiddeSummaryButton = document.querySelector('#GetBack')
    
    HiddeSummaryButton.addEventListener('click',function(){
        const Summary = document.querySelector('summary')
        Summary.style.display = 'none'
        
    })
}




function Start() {
    activeOption = document.querySelector('.timeOption.active');
    if (activeOption) {
        initialTime = parseInt(activeOption.textContent);
        let timeInSeconds = initialTime;
        const remainingTime = document.getElementById('remainingTime');

        countdownInterval = setInterval(function() {
            remainingTime.textContent = timeInSeconds + 's';
            if (timeInSeconds <= 0) {
                clearInterval(countdownInterval);
                remainingTime.textContent = initialTime + 's';
                GetClicksPerSecond()
                updateSummary()
                clickCounter = 0;
                clickCount.textContent = clickCounter;
                timerRunning = false;
                ShowSummary()
                HideSummary()
            }
            timeInSeconds--;
        }, 1000);
    } else {
        alert('Please select a time option before starting.');
    }
}

function ClearActiveTimer() {
    if (timerRunning) {
        clearInterval(countdownInterval);
        timerRunning = false;
    }
}

function toggleActive(element) {
    element.classList.toggle('active');
    element.style.backgroundColor = 'yellow';
}

function deactivateAllOptions() {
    AllOptions.forEach(option => {
        option.classList.remove('active');
        option.style.backgroundColor = 'rgba(190, 190, 190, 0.71)'
    });
}

function transferTime() {
    activeOption = document.querySelector('.timeOption.active');
    if (activeOption) {
        const remainingTime = document.getElementById('remainingTime');
        remainingTime.textContent = activeOption.textContent;
    }
}

ClickSubject.addEventListener('click', function() {
    activeOption = document.querySelector('.timeOption.active');
    if (!timerRunning) {
        if (activeOption) {
            clickCounter = 0;
            clickCount.textContent = clickCounter;
            Start();
            timerRunning = true;
        } else {
            alert('Please select a time option before starting.');
        }
    } else {
        clickCounter++;
        clickCount.textContent = clickCounter;
    }
});

timeContainer.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('timeOption')) {
        clickCounter = 0;
        clickCount.textContent = clickCounter;
        ClearActiveTimer();
        deactivateAllOptions();
        toggleActive(clickedElement);
        transferTime();
    }
});



