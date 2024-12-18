// ========== Classes ==========
// Classe Quartos
class Quartos {
    constructor(nome, numero, preco) {
        this.nome = nome;
        this.numero = numero;
        this.preco = preco;
    }
}

// Classe Reserva
class Reserva {
    constructor(cpf_cliente, numQuarto, checkIn, checkOut) {
        this.cpf_cliente = cpf_cliente;
        this.numQuarto = numQuarto;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
}

// Classe Usuario
class Usuario {
    constructor(nome, cpf, data, endereco, email, telefone, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.data = data;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}

// ========== Variáveis Globais ==========

let quartos = [];
let reservas = [];
let usuarios = [];
let logs=[]
usuarios.push(user = new Usuario('teste', '1', '2,', '3', '5', '6'))
let clienteLogado = null;
let funcionarioLogado = null;
let nomeIndex = 0
// Lista de funcionários fictícios
const jsonString = '[{"id":1,"nome":"Ana","cpf":1,"email":"ana@example.com","senha":"12345" },{"id":2,"nome":"Carlos","cpf":30,"email":"carlos@example.com","senha":"54321"}]';
const listaFuncionarios = JSON.parse(jsonString);

// Preços e nomes dos quartos
const nomesQuartos = ["Suite Luxo", "Suite Master", "Suite Simples", "Suite Presidencial", "Suite Executiva", "Suite Econômica", "Family Suite"];
const precosPorNome = {
    "Suite Luxo": 250,
    "Suite Master": 300,
    "Suite Simples": 150,
    "Suite Presidencial": 500,
    "Suite Executiva": 350,
    "Family Suite": 400,
};

function buscar_por_cpf(cpf) {
    if (validarCPF(cpf)) {
        let usuario = usuarios.find(usuario => usuario.cpf === cpf);
        return usuario
    }
}

// ========== Inicialização de Quartos ==========
for (let andar = 1; andar <= 5; andar++) {
    let numInicio = andar * 100;
    let numFim = numInicio + 5;

    for (let numQuarto = numInicio; numQuarto <= numFim; numQuarto++) {
        let nomeQuarto = nomesQuartos[nomeIndex % nomesQuartos.length]; // Cicla os nomes
        let preco = precosPorNome[nomeQuarto]; // Obtém o preço baseado no nome
        let novoQuarto = new Quartos(nomeQuarto, numQuarto, preco);
        quartos.push(novoQuarto);

        nomeIndex++; // Avança para o próximo nome
    }
}
// Função para verificar se as datas conflitam com as reservas existentes
function achar_quartos_nome(nomeQuarto) {
    let quartosEcontrados = quartos.filter(q => nomeQuarto === q.nome)
    return quartosEcontrados
}
function verificarReservasQuarto(numero, CheckIn, CheckOut) {
    const novaCheckIn = new Date(CheckIn);
    const novaCheckOut = new Date(CheckOut);
    for (let reserva of reservas) {
        if (reserva.numQuarto === numero) {
            const reservaCheckIn = new Date(reserva.checkIn);
            const reservaCheckOut = new Date(reserva.checkOut);

            // Verifica se as datas se sobrepõem
            if (novaCheckIn < reservaCheckOut && novaCheckOut > reservaCheckIn) {
                return false; // Conflito encontrado
            }
        }
    }
    return true; // Sem conflitos, quarto está disponível
}

// ========== Funções de Usuários ==========
function salvarDados() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
    localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
    localStorage.setItem('reservas', JSON.stringify(reservas));

}

function carregarDados() {
    const reservasSalvas = localStorage.getItem('reservas')
    if (reservasSalvas) reservas = JSON.parse(localStorage.getItem('reservas'));

    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) usuarios = JSON.parse(usuariosSalvos);

    const clientesalvo = localStorage.getItem("clienteLogado")
    if (clientesalvo) clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));

    const FuncSalvo = localStorage.getItem("funcionarioLogado")
    if (FuncSalvo) funcionarioLogado = JSON.parse(localStorage.getItem("funcionarioLogado"));
}
function carregarLogs(){
    const logsalvo = localStorage.getItem("logs")
    if (logsalvo) logs = JSON.parse(localStorage.getItem("log"));

}
carregarDados();
salvarDados();
carregarLogs();

function realizarCadastro(nome, cpf, data, endereco, email, telefone, senha) {
    if (!verificarCpfRepetido(cpf) || !validarCPF(cpf) || !verificarEmailRepetido(email) || !checkInputEmail(email) || !validarTelefone(telefone) || !checkInputEndereço(endereco)) {
        return false
    } else {
        let telefone_ = null
        const novoUsuario = new Usuario(nome, cpf, data, endereco, email, telefone_ = formatarTelefone(telefone), senha);
        usuarios.push(novoUsuario);
        gerarLog('cadastro', novoUsuario)
        salvarDados();
        alert("Cadastro realizado com sucesso!");
        window.location.href = "../login.html";
    }
}
function realizarLogin(email, senha) {
    carregarDados()
    if (!checkInputEmail(email)) {
        return false
    }
    // COLOCAR HASH PARA COMPARAR AS SENHAS
     let  cliente = usuarios.find(user => user.email === email && user.senha === senha);
     let clienteLogado= cliente.cpf
    funcionarioLogado = listaFuncionarios.find(func => func.email === email && func.senha === senha);

    if (clienteLogado) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
        window.location.href = "cliente/sobre.html";
        return

    } else if (funcionarioLogado) {
        alert("Login de funcionário realizado com sucesso!");
        localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
        window.location.href = "funcionario/sobreFunc.html";
        return
    } else {
        alert("Login inválido!");
        return
    }
}
function fazerLogout() {
    clienteLogado = null;
    funcionarioLogado = null;
    salvarDados();
    alert("Logout realizado.");
    window.location.href = "../inicio.html";
}


function atualizarDados(novaSenha, novoEndereco, novoEmail, novoTelefone) {
    if (!clienteLogado) {
        alert("Faça login para continuar.");
        return;
    }
    let usuario = buscar_por_cpf(clienteLogado);
    console.log(usuario)
    if (!usuario) {
        alert("Usuário não encontrado.");
        return;
    }

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }
    if (novoEmail) {
        if (!verificarEmailRepetido(novoEmail) || !checkInputEmail(novoEmail)) {
            return false
        } else {
            usuario.email = novoEmail;
        }
    }
    if (novoTelefone) {
        if (!validarTelefone(novoTelefone)) {
            return;
        } else {
            usuario.telefone = formatarTelefone(novoTelefone)
        }
    }
    if (novaSenha) {
        if (!validarSenha(novaSenha)) {
            return
        } else {
            //COLOCAR HASH AQUI
            usuario.senha = novaSenha
        }
    }
    if (novoEndereco) usuario.endereco = novoEndereco;

    salvarDados();
    alert('Dados atualizados com sucesso');
}//funcionaaaaa

//ATUALIZAR CLIENTE VIA FUNCIONARIO
function AtualizarDadosCliente(cpfSelecionado, novaSenha, novoEmail, novoEndereco, novoTelefone) {
    if (!funcionarioLogado) {
        alert("Faça login para continuar.");
        return;
    }

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }

    let usuario = buscar_por_cpf(cpfSelecionado);
    if (!usuario) {
        alert("Hóspede não encontrado.");
        return;
    }

    if (novoEmail) {
        if (!verificarEmailRepetido(novoEmail) || !checkInputEmail(novoEmail)) {
            return false
        } else {
            usuario.email = novoEmail;
        }
    }
    if (novoTelefone) {
        if (!validarTelefone(novoTelefone)) {
            return;
        } else {
            usuario.telefone = formatarTelefone(novoTelefone)
        }
    }
    if (novaSenha) {
        if (!validarSenha(novaSenha)) {
            return
        } else {
            //COLOCAR HASH AQUI
            usuario.senha = novaSenha
        }
    }
    if (novoEndereco) usuario.endereco = novoEndereco;



    salvarDados();
    alert('Dados atualizados com sucesso');
    return;
}
function excluirCadastro() {
    if (!clienteLogado) {
        return alert("é necessario estar logado para exluir seu cadastro")
    }
    carregarDados()
    usuarios = usuarios.filter(a => (a.cpf !== clienteLogado.cpf))
    reservas = reservas.filter(reserva => reserva.cpf_cliente !== clienteLogado.cpf);
    clienteLogado = null
    salvarDados()
    window.location.href = "../inicio.html"
    alert("exclusão feita com sucesso")
}
function excluirCadastroCliente() {
    if (!funcionarioLogado) {
        return alert("Faça login para continuar");
    }
    const aux = document.getElementById("HospedeExcluir").value; // Recebe o CPF do usuário selecionado
    const hospede = buscar_por_cpf(aux);
    if (hospede) {
        usuarios = usuarios.filter(c => c.cpf !== hospede.cpf);
        reservas = reservas.filter(reserva => reserva.cpf_cliente !== hospede.cpf);
        alert("O cadastro do hospede foi excluído");
        salvarDados();
    } else {
        alert("Hospede não encontrado");
    }
}
// ========== Funções de Reservas ==========
function calcularPreco() {
    const nomeQuarto = document.getElementById("nomeQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);
    const dataAtual = new Date
    if (checkIn < dataAtual.setHours(0, 0, 0, 0)) {
        alert("A data de check-in não pode ser anterior à data atual.");
        return false;
    }
    if (checkOut <= checkIn) {
        alert("A data de check-out deve ser maior que a de check-in!");
        return;
    }

    const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const precoTotal = dias * precosPorNome[nomeQuarto];

    document.getElementById("precoTotal").textContent = `Preço total: R$ ${precoTotal}`;
    document.getElementById("confirmarReserva").style.display = "flex";
    document.getElementById("cancelarReserva").style.display = "flex";
}
function achar_quarto_nome(nomeQuarto) {
    const quartoEscolhido = quartos.filter(q => q.nome == nomeQuarto)
    return quartoEscolhido
}
function confirmarReservaHospede() {
    if (funcionarioLogado) {
        const nomeQuarto = document.getElementById("nomeQuarto").value;
        const checkIn = new Date(document.getElementById("checkIn").value);
        const checkOut = new Date(document.getElementById("checkOut").value);
        const cpf_hospede = document.getElementById("cpfHospede").value;
        const cpf_encontrado = buscar_por_cpf(cpf_hospede);

        if (cpf_encontrado) {
            const quartoEscolhido = achar_quarto_nome(nomeQuarto);
            let numeroDoQuarto = null;

            for (let q of quartoEscolhido) {
                if (verificarReservasQuarto(q.numero, checkIn, checkOut)) {
                    numeroDoQuarto = q.numero;
                    break;
                }
            }

            if (numeroDoQuarto) {
                const novaReserva = new Reserva(cpf_encontrado.cpf, numeroDoQuarto, checkIn, checkOut);
                reservas.push(novaReserva);
                alert(`Reserva feita no quarto ${numeroDoQuarto}`);
                alert("Reserva criada do cliente com sucesso!");

                salvarDados()
                return;
            } else {
                alert("Nenhum quarto disponível para o período selecionado.");
            }
        } else {
            alert("Hóspede não encontrado.");
        }
    } else {
        alert("Faça login para continuar.");
        window.location.href = "../login.html";
    }
}
function confirmarReserva() {
    carregarDados();
    const nomeQuarto = document.getElementById("nomeQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);
    if (clienteLogado) {
        const quartosEscolhidos = achar_quarto_nome(nomeQuarto);
        let numeroDoQuarto = null;

        for (let q of quartosEscolhidos) {
            if (verificarReservasQuarto(q.numero, checkIn, checkOut)) {
                numeroDoQuarto = q.numero;
                break;
            }
        }
        if (numeroDoQuarto) {
            const novaReserva = new Reserva(clienteLogado, numeroDoQuarto, checkIn, checkOut);
            reservas.push(novaReserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert(`Reserva feita no quarto ${numeroDoQuarto}`);
            alert("Reserva criada com sucesso!");
            salvarDados();
            return;
        } else {
            alert("Nenhum quarto disponível para o período selecionado.");
        }
    } else {
        alert("Faça login para continuar.");
        window.location.href = "../login.html";
    }
}

function cancelarReserva() {
    document.getElementById("formReserva").reset();
    document.getElementById("precoTotal").textContent = "";
    document.getElementById("confirmarReserva").style.display = "none";
    document.getElementById("cancelarReserva").style.display = "none";
}
//=========== VALIDAÇÕES ============
function verificarCpfRepetido(cpf) {
    let cpf_encontrado = buscar_por_cpf(cpf)
    if (cpf_encontrado) {
        alert(`o CPF ${cpf} já está cadastrado no sistema`)
        return false;
    }
    return true
}
function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        alert("cpf invalido")
        return false;
    }
    if (/^(\d)\1*$/.test(cpfLimpo)) {
        alert("cpf invalido")
        return false;
    }
    return true
}
function verificarEmailRepetido(email) {
    for (let usuario of usuarios) {
        if (usuario.email === email) {
            alert(`O email ${email} já está cadastrado no sistema`);
            return false;
        }
    }
    return true
}
function checkInputEmail(email) {
    // Verifica se o campo email está vazio
    if (!email) {
        alert("Digite seu email");
        return false;
    }
    // Valida o formato do email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        alert("Insira um email válido");
        return false;
    }
    return true;
}
// Função para formatar número de telefone brasileiro
function formatarTelefone(numero) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = numero.replace(/\D/g, '');
    // Formata como (XX) XXXXX-XXXX
    return numeroLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}
// Função para validar número de telefone brasileiro
function validarTelefone(numero) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = numero.replace(/\D/g, '');
    // Verifica se o número tem 11 dígitos (para celulares com DDD)
    const regexTelefone = /^\d{11}$/;
    if (regexTelefone.test(numeroLimpo)) {
        return true
    }
    return false
}

function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (regex.test(senha)) {
        return true
    }
    return false
}

function checkInputEndereço(endereco) {
    if (!endereco) {
        alert("digite seu endereço")
        return false
    }
    return true
}
// ========== Manipulação do DOM ==========

document.addEventListener("DOMContentLoaded", () => {

    // Chamar função após DOM estar completamente carregado }
    const formularioCadastro = document.getElementById("cadastroUsuario");
    if (formularioCadastro) {
        formularioCadastro.addEventListener("submit", event => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const data = document.getElementById('data-nascimento').value;
            const endereco = document.getElementById('endereco').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const senha = document.getElementById('senha').value;

            if (!verificarCpfRepetido(cpf) || !checkInputEmail(email)) {
                return;
            }
            let telefoneformatado = formatarTelefone(telefone)
            realizarCadastro(nome, cpf, data, endereco, email, telefoneformatado, senha);

        });

    }

    const formularioLogin = document.getElementById("formularioLogin");
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", event => {
            event.preventDefault();
            const email = document.getElementById("email_login").value;
            const senha = document.getElementById("senha_login").value;
            realizarLogin(email, senha);
        });
    }

    const atualizarDadosForm = document.getElementById("AtualizarDados");
    if (atualizarDadosForm) {
        atualizarDadosForm.addEventListener("submit", event => {
            event.preventDefault();
            const novaSenha = document.getElementById('att_senha').value;
            const novoEndereco = document.getElementById('att_endereco').value;
            const novoTelefone = document.getElementById('att_telefone').value;
            const novoEmail = document.getElementById('att_email').value;
            atualizarDados(novaSenha, novoEndereco, novoEmail, novoTelefone);
        });
    }

    const atualizarDadosFormCliente = document.getElementById("AtualizarDadosCliente");
    if (atualizarDadosFormCliente) {
        atualizarDadosFormCliente.addEventListener("submit", event => {
            event.preventDefault();
            const cpfHospede = document.getElementById("cpf-Hospede").value;
            const nova_Senha = document.getElementById('att-senha').value;
            const novo_Endereco = document.getElementById('att-endereco').value;
            const novo_Telefone = document.getElementById('att-telefone').value;
            const novo_Email = document.getElementById('att-email').value;
            AtualizarDadosCliente(cpfHospede, nova_Senha, novo_Email, novo_Endereco, novo_Telefone);
        });
    }

    const formExcluirCadastro = document.getElementById("excluirCadastroa");
    if (formExcluirCadastro) {
        console.log('Inicializando exclusão de cadastro');

        formExcluirCadastro.addEventListener("submit", event => {
            event.preventDefault();
            alert("Processando exclusão");
            excluirCadastroCliente();
        });
    }


});

// LOGS

function gerarLog(operaco, cliente){
    const data_atual = new Date();
    const ano = data_atual.getFullYear();
    const mes = data_atual.getMonth()+1;
    const dia = data_atual.getDate();
    const hora = data_atual.getHours();
    const minuto = data_atual.getMinutes();
    const segundo =  data_atual.getSeconds();
    if(clienteLogado){
        let user = buscar_por_cpf(clienteLogado)
        let log = (`${user.nome} do cpf ${user.cpf} fez ${operaco} na data: ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`)
        logs.push(log);
        alert("operação registrada no site")
        localStorage.setItem("logs", JSON.stringify(logs))
    
    }
    if(operaco =='cadastro'){
        let log = (`${novoUsuario.nome} do cpf ${novoUsuario.cpf} fez ${operaco} na data: ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`)
        alert("operação registrada no site")
        localStorage.setItem("logs", JSON.stringify(logs))
    }
    if(funcionarioLogado){
        let log = (`Funcionario: ${funcionarioLogado.nome} fez ${operaco} de ${cliente} na data: ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`)
        logs.push(log);
        alert("operação registrada no site")
        localStorage.setItem("logs", JSON.stringify(logs))

    }else{alert("probllema ao fazer registro da operação ")}
    }
// Funções para navegação Funcionario
function irparaLogin() {
    if (funcionarioLogado || clienteLogado) {
        return alert('Você não pode fazer login estando logado')
    } else {
        window.location.href = '../login.html';


    }
}
function irParaInicio() {
    window.location.href = '../inicio.html';
}
function irParaSobreNos() {
    window.location.href = 'sobreFunc.html';
}
function irParaContabilidade() {
    if (funcionarioLogado == null) {
        return alert("apenas funcionarios podem acessar essa pagina")
    }
    window.location.href = 'contabilidade.html';
}
function irParaFazerReserva() {
    if (funcionarioLogado == null) {
        return alert("apenas funcionarios podem acessar essa pagina")
    }
    window.location.href = 'reservaFunc.html';
}
function irparaCadastroFunc() {
    if (funcionarioLogado == null) {
        return alert("apenas funcionarios podem acessar essa pagina")
    }
    window.location.href = 'cadastroFunc.html';

}
function irParaAtualizarCadastro() {
    if (funcionarioLogado == null) {
        return alert("apenas funcionarios podem acessar essa pagina")
    }
    window.location.href = 'atualizarDadosFunc.html';
}
function irParaAcomodacoesFunc() {
    window.location.href = 'quartosFunc.html';
}
// Nav Cliente
function irParaAcomodacoes() {
    window.location.href = 'quartos.html';
}
function irParaNovaReservaCliente() {
    if (!clienteLogado) {
        alert("faça login para poder acessar")
        return
    }
    window.location.href = 'reservas.html';
}
function irParaCadastroCliente() {
    if (clienteLogado) {
        return alert("cliente já cadastrado ")
    }
    window.location.href = '../cliente/cadastro.html';
}
function irParaAtualizarCadastroCliente() {
    if (!clienteLogado) {
        return alert("faça login para poder acessar")
    }
    window.location.href = 'atualizarDados.html';
}
function irParaSobreNosCliente() {
    window.location.href = 'sobre.html';
}
function irparaLogin() {
    if (clienteLogado || funcionarioLogado) {
        return alert("faça logout para fazer um novo login")
    } else if (funcionarioLogado) {
        return alert("faça logout para fazer um novo login")

    }
    window.location.href = '../login.html';
}
function irparaLoginA() {
    if (clienteLogado || funcionarioLogado) {

        return alert("faça logout para fazer um novo login")
    }
    window.location.href = 'login.html';
}
function irParaCadastro() {
    if (clienteLogado || funcionarioLogado) {
        return alert("você não pode estar cadastrado para acessar essa pagina")

    } else {
        window.location.href = "cadastro.html"

    }

}
function irParaCadastroA() {
    if (clienteLogado || funcionarioLogado) {
        return alert("você não pode estar cadastrado para acessar essa pagina")

    } else {
        window.location.href = "./cliente/cadastro.html"

    }
}