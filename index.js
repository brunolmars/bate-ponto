
const diasemana = document.getElementById("dia-semana");
const diamesano = document.getElementById("dia-mes-ano");
const horaminseg = document.getElementById("dia-hora-min-seg");
const btnbaterponto = document.getElementById("btn-bater-ponto");
const btndialogfechar = document.getElementById("btn-fechar-dialog");
const dialogponto = document.getElementById("dialog-ponto");
const dialogdata = document.getElementById("dialog-data")
const dialoghora = document.getElementById("dialog-hora")






btndialogfechar.addEventListener("click", () => {
    dialogponto.close();
});
navigator.geolocation.getCurrentPosition((position) =>{
    console.log(position)
    if (getCurrentPosition != position)
    console.log(alert)
})


btnbaterponto.addEventListener("click", register);



function register() {
    dialogponto.showModal();
}


function getCurrentDay() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return day + "/" + month + "/" + date.getFullYear();
}


function getTime() {
    const time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }

    return hour + ":" + minute + ":" + second;
}


function getWeekday() {
    const date = new Date();
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    return days[date.getDay()];
}


function printCurrentHour() {
    horaminseg.textContent = getTime();
}


function initialize() {
    diasemana.textContent = getWeekday();
    diamesano.textContent = getCurrentDay();
    printCurrentHour();
}


window.addEventListener("load", initialize);
