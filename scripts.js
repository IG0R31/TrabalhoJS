//Estados das funções que meu HTML vai ler

let tarefas = []; //Aqui é os arrays dos objetos listados
let proximoId = 1;
let filtroAtual = "todas";

//lista e adiciona as tarefas para o HTMML
function adicionar_tarefas() {
    const campo = document.getElementById('areaInput');
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
    const tarefas = tarefas.map(t => {
        if (tarefa.id !== id) return tarefa;
       return {...tarefa, concluida: !tarefa.concluida };;
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

    //Exibe apenas as tarefas do momento atual com o filter()
    const tarefasDisponiveis = tarefas.filter(tarefa => {
        if (filtroAtual === 'disponivel'){
            return !tarefa.concluida;
        }
        if (filtroAtual === 'concluida'){
            return tarefa.concluida;
        }
        return true;
    });

    // cria os itens [createElement()] e adiciona a cada tarefa [appendChild]
    tarefaVisualizar.forEach(tarefa => {
        const item = document.createElement('lido');

        const texto = document.createElement('span');
        texto.textContent = tarefa.descricao;
        if(tarefa.concluida){
            texto.style.textDecoration = 'line-through';
        }
        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = tarefa.conline-throughcluida ? 'Desfazer':'Concluir';
        botaoConcluir.addEventListener('click', () => alterarTarefa(tarefa.id));

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Exlcuir';
        botaoExcluir.addEventListener('click', () => removerTarefa(tarefa.id));

        item.appendChild(texto);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });

}

//calculadora de tentativas e tarefas
function Contador(){
    const ativas = tarefas.reduce(
        (total, tarefa) => total + (tarefa.concluida ? 0:1 ), 0
    );
    document.getElementById('conador').textContent = `${disponiveis} disponiveis de ${tarefas.length} tarefas`;
}
