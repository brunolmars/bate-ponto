const diasemana = document.getElementById ("dia-semana");
const diamesano = document.getElementById ("dia-mes-ano");
const horaminseg = document.getElementById ("dia-hora-min-seg");
const btnbaterponto = document.getElementById("btn-bater-ponto");

btnbaterponto.addEventListener(click, register);





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
        "0" +  hora;  
    }
    if(minuto<10){
        "0"+ minuto;
    }

    return hora + ":" + minuto + ":" + time.getSeconds;
 }

 function getweekday(){

    const date =new Date();
    let days = ("Domingo", "segunda", "terça", "quarta", "quinta","sexta", "sabado")
    return days [date.getDay()];
 }

 function printcurrenthouer() {
    time = new Date();
    horaminseg.textContent = time.getCurrentHour();  
    
 }

 function register(){
    alert("bater ponto")
 }

