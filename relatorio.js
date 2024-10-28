function mostrarRelatorio(pontos) {
    const relatorioDiv = document.getElementById("relatorio");
    relatorioDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (pontos.length === 0) {
        relatorioDiv.innerHTML = '<p>Nenhum registro encontrado.</p>';
        return;
    }

    pontos.forEach(ponto => {
        const pontoDiv = document.createElement("div");
        pontoDiv.innerHTML = `
            <p>Data: ${ponto.data} - Hora: ${ponto.hora} - Tipo: ${ponto.tipo}</p>
            <p>Observação: ${ponto.observacao || 'Nenhuma'}</p>
            ${ponto.justificativa ? `<p>Justificativa: ${ponto.justificativa}</p>` : ''}
            <button class="btn-editar" data-id="${ponto.id}">Editar</button>
            <button class="btn-excluir" data-id="${ponto.id}">Excluir</button>
        `;
        relatorioDiv.appendChild(pontoDiv);
    });
}

function recuperaPontosLocalStorage() {
    const todosOsPontos = localStorage.getItem("registro");
    return todosOsPontos ? JSON.parse(todosOsPontos) : [];
}

// Filtrar registros
function filtrarRegistros(periodo) {
    const pontos = recuperaPontosLocalStorage();
    let dataLimite = new Date();

    if (periodo === 'semana') {
        dataLimite.setDate(dataLimite.getDate() - 7);
    } else if (periodo === 'mes') {
        dataLimite.setMonth(dataLimite.getMonth() - 1);
    }

    const pontosFiltrados = pontos.filter(ponto => new Date(ponto.data) >= dataLimite);
    mostrarRelatorio(pontosFiltrados);
}

// Eventos dos botões de filtro
document.getElementById("btn-filtrar-ultima-semana").addEventListener("click", () => filtrarRegistros('semana'));
document.getElementById("btn-filtrar-ultimo-mes").addEventListener("click", () => filtrarRegistros('mes'));

// Mostrar todos os pontos ao carregar
mostrarRelatorio(recuperaPontosLocalStorage());
