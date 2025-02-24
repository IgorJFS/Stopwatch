const display = document.getElementById("display")
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;


function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop(){
    if (isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime
        isRunning = false;
    }
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00"
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes  = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let millliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2,0)
    minutes = String(minutes).padStart(2,0)
    seconds = String(seconds).padStart(2,0)
    millliseconds = String(millliseconds).padStart(2,0)
    

    display.textContent = `${hours}:${minutes}:${seconds}:${millliseconds}`
}

const toggleButton = document.getElementById('theme-toggle');

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

applySavedTheme();

