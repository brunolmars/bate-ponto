const diasemana = document.getElementById ("dia-semana");
const diamesano = document.getElementById ("dia-mes-ano");
const horaminseg = document.getElementById ("dia-hora-min-seg");


diasemana.textContent ="DOOMINGO";

function getCurrentDay(){
    const date = new Date();
    return date.getDate()+ "/" +date.getMonth()+ "/"+ date.getFullYear()


}


