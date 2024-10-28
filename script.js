// TO-DO:
// Organizar código

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const arrayDayWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const dialogPonto = document.getElementById("dialog-ponto");
let dialogHora = document.getElementById("dialog-hora");
let dialogData = document.getElementById("dialog-data");

dialogData.textContent = "Data: " + dataCompleta();

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let userLocation = {
                    "latitude": position.coords.latitude,
                    "longitude": position.coords.longitude
                };
                resolve(userLocation);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
};

const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    let dialogSelect = document.getElementById("select-tipos-ponto");
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    dialogSelect.value = proxPonto[ultimoPonto] || "entrada"; // Default to "entrada" if no last point

    dialogHora.textContent = "Hora: " + horaCompleta();
    dialogPonto.showModal();
});

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

function recuperaPontosLocalStorage() {
    let todosOsPontos = localStorage.getItem("registro");
    return todosOsPontos ? JSON.parse(todosOsPontos) : [];
}

function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperaPontosLocalStorage();
    pontos.push(ponto);
    localStorage.setItem("registro", JSON.stringify(pontos));
}

const divAlerta = document.getElementById("div-alerta");
const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", async () => {
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;
    let location = await getUserLocation();
    let justificativa = document.getElementById("justificativa").files[0];

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "location": location,
        "observacao": document.getElementById("observacao").value,
        "justificativa": justificativa ? justificativa.name : null // Armazenar o nome do arquivo
    };

    salvarRegistroLocalStorage(ponto);
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    dialogPonto.close();
    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");

    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);
});

function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

atualizaHora();
setInterval(atualizaHora, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
