//Estados das funções que meu HTML vai ler

let tarefas = []; //Aqui é os arrays dos objetos listados
let proximoId = 1;
let filtroAtual = "todas";

//lista e adiciona as tarefas para o HTML
function adicionarTarefa() {
    const campo = document.getElementById('inputTarefa');
    const descricao = campo.value.trim(); //o trim() é responsavel por ignorar as descrições vazias.

    if (descricao === '') {
        return; //se tiver descricao vazia ele apenas ignora
    }
    tarefas.push({id: proximoId, descricao: descricao, concluida: false});
    proximoId++;
    campo.value = ''; //limpa o campo
    renderizar();
}

//Inverte sua conclusividade.
function alterarTarefa(id){
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id !== id) return tarefa;
        return {...tarefa, concluida: !tarefa.concluida};
    });
    renderizar();
}

//Faz a remoção utilizando um filtro
function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id); //mantem apenas as tarefas com o id diferente
    renderizar();
}

//Limpa e recria os seus itens
function renderizar(){
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    //Exibe apenas as tarefas do filtro atual com o filter()
    const tarefasVisiveis = tarefas.filter(tarefa => {
        if (filtroAtual === 'ativas'){
            return !tarefa.concluida;
        }
        if (filtroAtual === 'concluidas'){
            return tarefa.concluida;
        }
        return true;
    });

    // cria os itens [createElement()] e adiciona a cada tarefa [appendChild]
    tarefasVisiveis.forEach(tarefa => {
        const item = document.createElement('li');

        const texto = document.createElement('span');
        texto.textContent = tarefa.descricao;
        if(tarefa.concluida){
            texto.style.textDecoration = 'line-through';
        }
        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
        botaoConcluir.addEventListener('click', () => alterarTarefa(tarefa.id));

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => removerTarefa(tarefa.id));

        item.appendChild(texto);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });

    //contador: "X ativas de Y tarefas", calculando X com reduce()
    const ativas = tarefas.reduce(
        (total, tarefa) => total + (tarefa.concluida ? 0 : 1), 0
    );
    document.getElementById('contador').textContent = `${ativas} ativas de ${tarefas.length} tarefas`;
}

//Eventos nos botões do HTML
document.getElementById('botaoAdicionar').addEventListener('click', adicionarTarefa);

document.getElementById('filtroTodas').addEventListener('click', () => { filtroAtual = 'todas';      renderizar(); });
document.getElementById('filtroAtivas').addEventListener('click', () => { filtroAtual = 'ativas';     renderizar(); });
document.getElementById('filtroConcluidas').addEventListener('click', () => { filtroAtual = 'concluidas'; renderizar(); });

renderizar(); //renderiza a lista na hora que a página abre