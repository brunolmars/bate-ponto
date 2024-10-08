const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const selectRegisterType = document.getElementById("register-type");
const btnDialogRegister = document.getElementById("btn-dialog-register");
const btnDialogFechar = document.getElementById("dialog-fechar");
const alertaSucesso = document.getElementById("alerta-ponto-registrado");

btnRegistrarPonto.addEventListener("click", register);
btnDialogRegister.addEventListener("click", handleRegister);
btnDialogFechar.addEventListener("click", () => dialogPonto.close());

updateUI();

function updateUI() {
    diaSemana.textContent = getWeekDay();
    dataAtual.textContent = getCurrentDate();
    horaAtual.textContent = getCurrentTime();
    setRegisterType();
    setInterval(() => {
        horaAtual.textContent = getCurrentTime();
    }, 1000);
}

function setRegisterType() {
    let lastType = localStorage.getItem("lastRegisterType") || "entrada";
    const registerTypes = {
        "entrada": "intervalo",
        "intervalo": "volta-intervalo",
        "volta-intervalo": "saida",
        "saida": "entrada"
    };
    selectRegisterType.value = registerTypes[lastType] || "entrada";
}

async function handleRegister() {
    let register = await getObjectRegister(selectRegisterType.value);
    saveRegisterLocalStorage(register);
    localStorage.setItem("lastRegister", JSON.stringify(register));
    showSuccessAlert();
    dialogPonto.close();
}

async function getObjectRegister(registerType) {
    const location = await getUserLocation();
    return {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": location,
        "id": 1,
        "type": registerType
    };
}

function saveRegisterLocalStorage(register) {
    let registers = getRegisterLocalStorage("register");
    registers.push(register);
    localStorage.setItem("register", JSON.stringify(registers));
}

function getRegisterLocalStorage(key) {
    let registers = localStorage.getItem(key);
    return registers ? JSON.parse(registers) : [];
}

function showSuccessAlert() {
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");
    setTimeout(() => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 5000);
}

function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + String(date.getFullYear());
}

function getWeekDay() {
    const date = new Date();
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[date.getDay()];
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
            (error) => reject("Erro " + error)
        );
    });
}
