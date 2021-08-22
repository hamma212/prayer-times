const fajr = document.getElementById('fajr');
const sunrise = document.getElementById('sunrise');
const dhuhr = document.getElementById('dhuhr');
const asr = document.getElementById('asr');
const maghrib = document.getElementById('maghrib');
const isha = document.getElementById('isha');
const title = document.getElementById('title');

const enterButton = document.querySelector('.enter-btn');
const enterCityForm = document.querySelector('.enter-city-form');

enterButton.addEventListener('click', getPrayerTimes);

async function getPrayerTimes() {
    let enteredCity = enterCityForm.value.toLowerCase();
    title.textContent = `Prayer times in ${formatCity(enteredCity)}`;
    enteredCity = enteredCity.replace(/\s/g , "-");
    if (enteredCity == '') {
        alert("Enter your city first!");
    }
    else {
        try {
            const response = await fetch(`https://api.pray.zone/v2/times/today.json?city=${enteredCity}&key=MagicKey`, {mode: 'cors'});
            const times = await response.json();
            const data = times.results.datetime[0].times;
            updateTimes(data);
        }
        catch (error) {
            title.textContent = "Prayer times in ...";
            alert("Couldn't find that city!")
        }
    }
}

function formatCity(city) {
    city = city.split(' ');
    for (let i=0; i < city.length; i++) {
        city[i] = city[i].charAt(0).toUpperCase() + city[i].slice(1);
    }
    return city.join(' ');
}

function toTwelveHourTime(time) {
    time = time.split(":");
    if (time[0] > 12) {
        time[0] -= 12;
    }
    else if(time[0] < 12) {
        time[0] = time[0] * 1; // to remove leading zero
    }
    return time.join(':');
}


function updateTimes(data) {
    fajr.textContent = toTwelveHourTime(data.Fajr);
    sunrise.textContent = toTwelveHourTime(data.Sunrise);
    dhuhr.textContent = toTwelveHourTime(data.Dhuhr);
    asr.textContent = toTwelveHourTime(data.Asr);
    maghrib.textContent = toTwelveHourTime(data.Sunset);
    isha.textContent = toTwelveHourTime(data.Isha);
}
