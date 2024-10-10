const relatorio = document.getElementById("dialog-relatorio")
const abrirdialog = document.getElementById("abrir-dialog");
abrirdialog.addEventListener("click" () => {
 relatorio.showModal()
}) 
const fechardialog =document.getElementById("fechar-dialog")
fechardialog.addEventListener("click", () => {
    relatorio.closest()
})

document.getElementById('data').textContent = new Date().toLocaleDateString();
document.getElementById('hora').textContent = new Date().toLocaleTimeString()