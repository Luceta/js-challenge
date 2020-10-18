const API_KEY = "1213";
const COORDS = 'coords';


function saveCoords(coordsObj){

    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function handleGeoSucess(position){

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log('Cant acess geo');
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);


}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        //get weather
    }
}


function init(){
    loadCoords();
}

init();