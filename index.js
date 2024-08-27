const diasemana = document.getElementById ("dia-semana");
const diamesano = document.getElementById ("dia-mes-ano");
const horaminseg = document.getElementById ("dia-hora-min-seg");


diasemana.textContent ="DOOMINGO";

function getCurrentDay(){
    const date = new Date();


    let Day = getDate()
    let may = getMonth()
    if (Day < 10 ){
        return "0" + (Day +1)   }
    if (may < 10)
        return "0"+ (may + 1)
    return Day+ "/" + may +"/"+ date.getFullYear()


}

 function gettime(){
    const time = new Date()

    let hora = getHours()
    let minuto = getMinutes()

    if(hora < 10 ){
        "0" +  hora  
    }
    if(minuto<10){
        "0"+ minuto
    }

    return hora + ":" + minuto + ":" + time.getSeconds;
 }


