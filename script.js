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

class Usuario {
    #nome;
    #cpf;
    #data;
    #endereco;
    #email;
    #telefone;
    #senha;
    #conta;

    constructor(nome, cpf, data, endereco, email, telefone, senha, conta = 0) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data = data;
        this.#endereco = endereco;
        this.#email = email;
        this.#telefone = telefone;
        this.#senha = senha;
        this.#conta = conta;
    }

    getNome() { return this.#nome; }
    getCpf() { return this.#cpf; }
    getData() { return this.#data; }
    getEndereco() { return this.#endereco; }
    getEmail() { return this.#email; }
    getTelefone() { return this.#telefone; }
    getSenha() { return this.#senha; }
    getConta() { return this.#conta; }
    setEndereco(novoEndereco) { this.#endereco = novoEndereco; }
    setEmail(novoEmail) { this.#email = novoEmail; }
    setTelefone(novoTelefone) { this.#telefone = novoTelefone; }
    setSenha(novaSenha) { this.#senha = novaSenha; }
    atualizarConta(valor) { this.#conta += valor; }
    quitarDivida() { this.#conta = 0; }
}

// ========== Variáveis Globais ==========
let quartos = [];
let reservas = [];
let usuarios = [];
let hospedesNoHotel = []
let logs = []


usuarios.push(user = new Usuario('teste', '1', '2,', '3', '5', '6'))
var clienteLogado = null;
var funcionarioLogado = null;
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
        let usuario = usuarios.find(usuario => usuario.getCpf() === cpf);
        return usuario;
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
    // Convertendo cada instância de Usuario em um objeto simples
    const usuariosData = usuarios.map(usuario => ({
        nome: usuario.getNome(),
        cpf: usuario.getCpf(),
        data: usuario.getData(),
        endereco: usuario.getEndereco(),
        email: usuario.getEmail(),
        telefone: usuario.getTelefone(),
        senha: usuario.getSenha(),
        conta: usuario.getConta()
    }));
    
    // Salvando os dados no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosData));
    localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
    localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
    localStorage.setItem('reservas', JSON.stringify(reservas));
    localStorage.setItem('checkin_realizado', JSON.stringify(hospedesNoHotel));
}


function carregarDados() {
    const reservasSalvas = localStorage.getItem('reservas');
    if (reservasSalvas) reservas = JSON.parse(reservasSalvas);

    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) {
        const usuariosData = JSON.parse(usuariosSalvos);
        // Recriando as instâncias da classe Usuario
        usuarios = usuariosData.map(data => new Usuario(data.nome, data.cpf, data.data, data.endereco, data.email, data.telefone, data.senha, data.conta));
    }

    const clientesalvo = localStorage.getItem("clienteLogado");
    if (clientesalvo) clienteLogado = JSON.parse(clientesalvo);

    const FuncSalvo = localStorage.getItem("funcionarioLogado");
    if (FuncSalvo) funcionarioLogado = JSON.parse(FuncSalvo);

    const Check_in = localStorage.getItem('checkin_realizado');
    if (Check_in) hospedesNoHotel = JSON.parse(Check_in);
}

function carregarLogs() {
    const logsalvo = localStorage.getItem("logs");
    if (logsalvo) logs = JSON.parse(logsalvo);
}

function carregarLogs() {
    const logsalvo = localStorage.getItem("logs")
    if (logsalvo) logs = JSON.parse(localStorage.getItem("log"));

}
carregarDados();
salvarDados();
carregarLogs();

function realizarCadastro(nome, cpf, data, endereco, email, telefone, senha) {
    console.log("Iniciando a validação do cadastro...");
    if (!validarNome(nome)) {
        console.log("Falha na validação do nome");
        return false;
    }
    if (!verificarCpfRepetido(cpf)) {
        console.log("Falha na verificação do CPF repetido");
        return false;
    }
    if (!validarCPF(cpf)) {
        console.log("Falha na validação do CPF");
        return false;
    }
    if (!verificarEmailRepetido(email)) {
        console.log("Falha na verificação do email repetido");
        return false;
    }
    if (!checkInputEmail(email)) {
        console.log("Falha na verificação do email");
        return false;
    }
    if (!validarTelefone(telefone)) {
        console.log("Falha na validação do telefone");
        return false;
    }
    if (!checkInputEndereço(endereco)) {
        console.log("Falha na verificação do endereço");
        return false;
    }
    if (!validarSenha(senha)) {
        console.log("Falha na validação da senha");
        return false;
    }

    alert('Tudo foi validado');
    const telefoneFormatado = formatarTelefone(telefone);
    const novoUsuario = new Usuario(nome, cpf, data, endereco, email, telefoneFormatado, senha, conta = 0);
    usuarios.push(novoUsuario);
    salvarDados();
    adicionarLog("Cadastro realizado", `Usuário: ${nome}`, cpf);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login.html";
}
function realizarLogin(email, senha) {
    carregarDados();
    
    if (!checkInputEmail(email)) {
        return false;
    }

    // Verificar funcionários
    funcionarioLogado = listaFuncionarios.find(func => func.email === email && func.senha === senha);
    if (funcionarioLogado) {
        alert("Login de funcionário realizado com sucesso!");
        localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
        window.location.href = "./funcionario/sobreFunc.html";
        return;
    }

    // Verificar clientes
    let cliente = usuarios.find(usuario => usuario.getEmail() === email && usuario.getSenha() === senha);
    if (cliente) {
        alert("Login realizado com sucesso!");
        clienteLogado = cliente.getCpf();
        localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
        adicionarLog("Login realizado", `Cliente: ${cliente.getNome()}`, cliente.getCpf());
        window.location.href = "./cliente/sobre.html";
        return;
    } else {
        alert("Login inválido!");
        return;
    }
}

function fazerLogout() {
    clienteLogado = null;
    funcionarioLogado = null;
    salvarDados();
    alert("Logout realizado");
    window.location.href='../inicio.html'
}
    function atualizarDados(novaSenha, novoEndereco, novoEmail, novoTelefone) {
        if (!clienteLogado) {
            alert("Faça login para continuar.");
            return;
        }
        let usuario = buscar_por_cpf(clienteLogado);
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
                return false;
            } else {
                usuario.setEmail(novoEmail);
            }
        }
        if (novoTelefone) {
            if (!validarTelefone(novoTelefone)) {
                return;
            } else {
                usuario.setTelefone(formatarTelefone(novoTelefone));
            }
        }
        if (novaSenha) {
            if (!validarSenha(novaSenha)) {
                return;
            } else {
                usuario.setSenha(novaSenha); // Colocar hash aqui
            }
        }
        if (novoEndereco) usuario.setEndereco(novoEndereco);
    
        salvarDados();
        alert('Dados atualizados com sucesso');
    }
    
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
            return false;
        } else {
            usuario.setEmail(novoEmail);
        }
    }
    if (novoTelefone) {
        if (!validarTelefone(novoTelefone)) {
            return;
        } else {
            usuario.setTelefone(formatarTelefone(novoTelefone));
        }
    }
    if (novaSenha) {
        if (!validarSenha(novaSenha)) {
            return;
        } else {
            usuario.setSenha(novaSenha); // Colocar hash aqui
        }
    }
    if (novoEndereco) usuario.setEndereco(novoEndereco);

    salvarDados();
    alert('Dados atualizados com sucesso');
}

function excluirCadastroa() {
    if (!funcionarioLogado) {
        return alert("é necessario estar logado para exluir o cadastro")
    }
    carregarDados()
    const cpf =document.getElementById("HospedeExcluir").value;
    usuarios = usuarios.filter(a => (a.getCpf() !== cpf))
    reservas = reservas.filter(reserva => reserva.cpf_cliente !== clienteLogado.cpf);
    clienteLogado = null
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    salvarDados()
    window.location.href = "../inicio.html"
    alert("exclusão feita com sucesso")
}
function excluirCadastro() {
    if (!clienteLogado) {
        alert("É necessário estar logado para excluir seu cadastro");
        return;
    }
    carregarDados();
    let usuario = buscar_por_cpf(clienteLogado);
    usuarios = usuarios.filter(a => a.getCpf() !== clienteLogado);
    reservas = reservas.filter(reserva => reserva.cpf_cliente !== clienteLogado);
    clienteLogado = null;
    salvarDados();
    adicionarLog("Cadastro excluído", `Cliente: ${usuario.getNome()}`);
    alert("Exclusão feita com sucesso");
    window.location.href = "../inicio.html";
}


// Função para realizar o check-in
function realizarCheckin(cpf_checkin, data_checkin) {
    let data = new Date(data_checkin);
    let reservaCheckIn = reservas.find(r =>
        new Date(r.checkIn).getTime() === data.getTime() && cpf_checkin === r.cpf_cliente
    );

    if (!reservaCheckIn) {
        alert("Reserva não encontrada");
    } else {
        hospedesNoHotel.push(reservaCheckIn);
        let hospede = buscar_por_cpf(cpf_checkin);
        alert(`Check-in do(a) hóspede ${hospede.getNome()} realizado`);
        reservas = reservas.filter(r => r.cpf_cliente !== cpf_checkin);
        localStorage.setItem('checkin_realizado', JSON.stringify(hospedesNoHotel));
        salvarDados();
        adicionarLog("Check-in realizado", `Cliente: ${hospede.getNome()}`, cpf_checkin);
        return true;
    }
}


function realizarCheckout(data_checkOut, cpf_checkOut) {
    carregarDados();
    let data = new Date(data_checkOut);
    let reservaCheckOut = hospedesNoHotel.find(r => new Date(r.checkOut).getTime() === data.getTime() && cpf_checkOut === r.cpf_cliente);

    if (!reservaCheckOut) {
        alert("Reserva não encontrada");
    } else {
        hospedesNoHotel = hospedesNoHotel.filter(a => a.cpf_cliente !== cpf_checkOut);
        let hospede = buscar_por_cpf(cpf_checkOut);

        if (hospede) {
            let valorConta = hospede.getConta();
            alert(`Check-out do(a) hóspede ${hospede.getNome()} realizado. Valor da conta: R$ ${valorConta}`);

            // Quitar dívida
            hospede.quitarDivida();

            localStorage.setItem('checkin_realizado', JSON.stringify(hospedesNoHotel));
            salvarDados();

            // Adicionar log
            adicionarLog("Check-out realizado", `Funcionário: ${funcionarioLogado ? funcionarioLogado.nome : 'Desconhecido'}`, cpf_checkOut);

            return true;
        } else {
            alert("Hóspede não encontrado.");
            return false;
        }
    }
}



// ========== Funções de Reservas ==========
function calcularPreco() {
    const nomeQuarto = document.getElementById("nomeQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);
    const dataAtual = new Date()
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
        const clienteEncontrado = buscar_por_cpf(cpf_hospede);
        const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        let precoTotal = dias * precosPorNome[nomeQuarto];
        if (validarCPF(cpf_hospede)) {
            const quartoEscolhido = achar_quarto_nome(nomeQuarto);
            let numeroDoQuarto = null;

            for (let q of quartoEscolhido) {
                if (verificarReservasQuarto(q.numero, checkIn, checkOut)) {
                    numeroDoQuarto = q.numero;
                    break;
                }
            }

            if (numeroDoQuarto) {
                const reservaExistente = reservas.find(r => r.cpf_cliente === clienteEncontrado);
                if (reservaExistente) {
                    alert("O cliente já possui uma reserva ativa.");
                    return false;
                }
                const novaReserva = new Reserva(clienteEncontrado.getCpf(), numeroDoQuarto, checkIn, checkOut);
                reservas.push(novaReserva);
                alert(`Reserva feita no quarto ${numeroDoQuarto}`);
                alert("Reserva criada do cliente com sucesso!");
                clienteEncontrado.atualizarConta( precoTotal)
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
    const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    let precoTotal = dias * precosPorNome[nomeQuarto];
    if (clienteLogado) {
        // Verificar se o cliente já possui uma reserva ativa
        const reservaExistente = reservas.find(r => r.cpf_cliente === clienteLogado);
        if (reservaExistente) {
            alert("Você já possui uma reserva ativa.");
            return;
        }

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
            clienteEncontrado.atualizarConta( precoTotal)
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
    } else if (/^(\d)\1*$/.test(cpfLimpo)) {
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
    if (!regexTelefone.test(numeroLimpo)) {
        alert("numero invalido")
        return false
    }
    return true
}

function validarSenha(senha) {
    console.log("Validando senha");
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(senha)) {
        alert("A senha deve ter letra maiúscula/minúscula, caractere especial e números.");
        return false;
    }
    return true;
}
function checkInputEndereço(endereco) {
    if (!endereco) {
        alert("digite seu endereço")
        return false
    }
    return true
}
function validarNome(nome) {
    // Verifica se o nome está vazio
    if (!nome.trim()) {
        alert("O nome não pode estar vazio");
        return false;
    }

    // Verifica se o nome tem pelo menos 2 caracteres e no máximo 50
    if (nome.length < 2 || nome.length > 50) {
        alert("O nome deve ter entre 2 e 50 caracteres");
        return false;
    }

    // Verifica se o nome contém apenas letras (inclui acentos e espaços)
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(nome)) {
        alert("O nome deve conter apenas letras e espaços");
        return false;
    }

    return true;
}

// ========== Manipulação do DOM ==========
const novaPagina = verificarPaginaAtual();
 if (novaPagina) {
    window.location.href = novaPagina;
   }
document.addEventListener("DOMContentLoaded",  () => {

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
             realizarCadastro(nome, cpf, data, endereco, email, telefone, senha);
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
        formExcluirCadastro.addEventListener("submit", event => {
            event.preventDefault();
             excluirCadastroCliente();
        });
    }

    const formCheckin = document.getElementById('fazerCheckin');
    if (formCheckin) {
        formCheckin.addEventListener("submit", event => {
            event.preventDefault();
            let cpf_checkin = document.getElementById("chekInHospede").value;
            let data_checkin = document.getElementById("dataChekin").value;
             realizarCheckin(cpf_checkin, data_checkin);
        });
    }

    const formCheckOut = document.getElementById("formCheckout");
    if (formCheckOut) {
        formCheckOut.addEventListener("submit",  event => {
            event.preventDefault();
            let cpf_checkOut = document.getElementById("clienteCheckout").value;
            let data_checkOut = document.getElementById("dataCheckOut").value;
             realizarCheckout(data_checkOut, cpf_checkOut);
        });
    }

    carregarDados();

    const cont = document.getElementById("contabilidadeForm");
    if (cont) {
        const calcularButton = document.getElementById('calcular');
        const confirmarButton = document.getElementById('confirmar');
        const valorTotalSpan = document.getElementById('valorTotal');

        calcularButton.addEventListener('click', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const cpf = document.getElementById('cpf').value;
            const restaurante = document.getElementById('restaurante');
            const frigobar = document.getElementById('frigobar');

            // Verifica se o usuário existe
            const usuario = usuarios.find(user => user.getEmail() === email && user.getCpf() === cpf);
            if (!usuario) {
                alert('Usuário não encontrado!');
                return;
            }

            // Calcula o valor total
            let valorTotal = 0;
            if (restaurante.checked) valorTotal += parseInt(restaurante.value);
            if (frigobar.checked) valorTotal += parseInt(frigobar.value);

            valorTotalSpan.textContent = `${valorTotal}`;

            // Exibe o botão Confirmar se houver valor
            if (valorTotal > 0) {
                confirmarButton.style.display = 'inline';
            } else {
                confirmarButton.style.display = 'none';
            }
        });

        confirmarButton.addEventListener('click', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const cpf = document.getElementById('cpf').value;
            const restaurante = document.getElementById('restaurante');
            const frigobar = document.getElementById('frigobar');
        
            // Verifica se o usuário existe
            const usuario = usuarios.find(user => user.getEmail() === email && user.getCpf() === cpf);
            if (!usuario) {
                alert('Usuário não encontrado!');
                return;
            }
        
            // Calcula o valor total
            let valorTotal = 0;
            if (restaurante.checked) valorTotal += parseInt(restaurante.value);
            if (frigobar.checked) valorTotal += parseInt(frigobar.value);
        
            // Atualiza o valor da conta do usuário
            usuario.atualizarConta(valorTotal);
            salvarDados();
        
            alert(`Valor de ${valorTotal}$ vinculado à conta do usuário.`);
            confirmarButton.style.display = 'none';
            valorTotalSpan.textContent = '0$';
        });
        
    }

});

function visualizarLogs() {
    // Carrega os logs do localStorage
    const logs = JSON.parse(localStorage.getItem("logs")) || [];

    // Seleciona o elemento onde os logs serão exibidos
    const logContainer = document.getElementById("logContainer");

    // Limpa qualquer conteúdo existente
    logContainer.innerHTML = "";

    if (logs.length === 0) {
        logContainer.textContent = "Nenhum log encontrado.";
        return;
    }
    // Cria uma lista ou tabela para exibir os logs
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    // Cabeçalho da tabela
    const header = `
        <tr>
            <th style="border: 1px solid black; padding: 8px;">#</th>
            <th style="border: 1px solid black; padding: 8px;">Descrição do Log</th>
        </tr>
    `;
    table.innerHTML = header;
    // Insere os logs na tabela
    logs.forEach((log, index) => {
        const row = `
            <tr>
                <td style="border: 1px solid black; padding: 8px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid black; padding: 8px;">${log}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
    // Adiciona a tabela ao container
    logContainer.appendChild(table);
}
function adicionarLog(descricao, quemRealizou, cpfCliente = null) {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    const dataHora = new Date().toLocaleString();

    const novoLog = {
        descricao: descricao,
        quemRealizou: quemRealizou,
        dataHora: dataHora,
        cpfCliente: cpfCliente
    };

    logs.push(novoLog);
    localStorage.setItem("logs", JSON.stringify(logs));
}

function verificarPaginaAtual() {
    const pathname = window.location.pathname;
    if (!funcionarioLogado && (
        pathname.includes('contabilidade.html') || 
        pathname.includes('reservaFunc.html') || 
        pathname.includes('cadastroFunc.html') || 
        pathname.includes('atualizarDadosFunc.html')
    )) {
        alert("Apenas funcionários podem acessar essa página");
        return window.location.href = "sobreFunc.html";
    }
    if( (pathname.includes('reservas.html') && !clienteLogado) ||(pathname.includes('atualizarDados.html') && !clienteLogado)){
            alert("Faça login para poder acessar");
            return window.location.href = "../login.html";
        }
     if (pathname.includes('login.html')&& clienteLogado) {
            alert("Não é possível acessar login estando logado");
            return window.location.href = "sobre.html"
        }
        
    }
    

