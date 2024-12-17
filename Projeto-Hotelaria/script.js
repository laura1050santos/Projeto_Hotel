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
usuarios.push(user=new Usuario('teste','1','2,','3','5','6'))
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
    let sla =usuarios.find(usuario => usuario.cpf === cpf);
    return sla
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
function achar_quartos_nome(nomeQuarto){
    let quartosEcontrados= quartos.filter(q=> nomeQuarto === q.nome)
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
localStorage.setItem('reservas', JSON.stringify(reservas))

function salvarDados() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
    localStorage.setItem("funcionarioLogado", JSON.stringify(funcionarioLogado));
}

function carregarDados() {
    const reservasSalvas = localStorage.getItem('reservas')
    if (reservasSalvas) reservas = JSON.parse(reservasSalvas);

    const usuariosSalvos = localStorage.getItem('usuarios');
    if (usuariosSalvos) usuarios = JSON.parse(usuariosSalvos);

    const clientesalvo = localStorage.getItem("clienteLogado")
    if (clientesalvo) clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));

    const FuncSalvo = localStorage.getItem("funcionarioLogado")
    if (FuncSalvo) funcionarioLogado = JSON.parse(localStorage.getItem("funcionarioLogado"));
}
carregarDados();
salvarDados()

function realizarCadastro(nome, cpf, data, endereco, email, telefone, senha) {
    const novoUsuario = new Usuario(nome, cpf, data, endereco, email, telefone, senha);
    usuarios.push(novoUsuario);
    salvarDados();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login.html";
}
function realizarLogin(email, senha) {
    carregarDados()
    clienteLogado = usuarios.find(user => user.email === email && user.senha === senha);
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

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }
    let usuario = buscar_por_cpf(clienteLogado.cpf);
    console.log(usuario)
    if (!usuario) {
        alert("Usuário não encontrado.");
        return;
    }
    if (novaSenha) usuario.senha = novaSenha;
    if (novoEndereco) usuario.endereco = novoEndereco;
    if (novoTelefone) usuario.telefone = novoTelefone;
    if (novoEmail) usuario.email = novoEmail;

    salvarDados();
    alert('Dados atualizados com sucesso');
}//funcionaaaaa

//ATUALIZAR CLIENTE VIA FUNCIONARIO
function AtualizarDadosCliente(hospedeSelecionado, novaSenha, novoEmail, novoEndereco, novoTelefone) {
    if (!funcionarioLogado) {
        alert("Faça login para continuar.");
        return;
    }

    if (!novaSenha && !novoEndereco && !novoTelefone && !novoEmail) {
        alert("Preencha um dos campos para atualizar.");
        return;
    }

    let usuario = buscar_por_cpf(hospedeSelecionado);
    if (!usuario) {
        alert("Hóspede não encontrado.");
        return;
    }

    if (novaSenha) usuario.senha = novaSenha;
    if (novoEndereco) usuario.endereco = novoEndereco;
    if (novoTelefone) usuario.telefone = novoTelefone;
    if (novoEmail) usuario.email = novoEmail;

    salvarDados();
    alert('Dados atualizados com sucesso');
    return;
}

function excluirCadastro() {
    if (!clienteLogado) {
        return alert("é necessario estar logado para exluir seu cadastro")
    }
    carregarDados()
    salvarDados()
    usuarios = usuarios.filter(a => (a.cpf !== clienteLogado.cpf))
    clienteLogado=null
    salvarDados()
    window.location.href = "../inicio.html"
    alert("exclusão feita com sucesso")
}

function excluirCadastroCliente() {
    if (!funcionarioLogado) {
        return alert("Faça login para continuar");
    }
    alert("Excluindo cadastro do cliente");
    const aux = document.getElementById("HospedeExcluir").value; // Recebe o CPF do usuário selecionado
    const hospede = buscar_por_cpf(aux);
    if (hospede) {
        usuarios = usuarios.filter(c => c.cpf !== hospede.cpf);
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
function achar_quarto_nome(nomeQuarto){
    const quartoEscolhido= quartos.filter(q=> q.nome == nomeQuarto )
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
                localStorage.setItem('reservas', JSON.stringify(reservas));
                alert(`Reserva feita no quarto ${numeroDoQuarto}`);
                alert("Reserva criada do cliente com sucesso!");
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
            const novaReserva = new Reserva(clienteLogado.cpf, numeroDoQuarto, checkIn, checkOut);
            reservas.push(novaReserva);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert(`Reserva feita no quarto ${numeroDoQuarto}`);
            alert("Reserva criada com sucesso!");
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


            function checkInputCPF(cpf) {
                let cpf_encontrado = buscar_por_cpf(cpf)
                if (cpf_encontrado) {
                    alert(`o CPF ${cpf} já está cadastrado no sistema`)
                    return false;
                }
                return true
            }


            function checkInputEmail(email) {
                let usuario
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

                // Verifica se o email já está cadastrado
                for (usuario of usuarios) {
                    if (usuario.email === email) {
                        alert(`O email ${email} já está cadastrado no sistema`);
                        return false;
                    }
                }
                // Se todas as verificações passarem
                return true;
            }
            if (!checkInputCPF(cpf) || !checkInputEmail(email)) {
                return;
            }
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
        console.log('Inicializando exclusão de cadastro');
        alert("Inicializando exclusão de cadastro");
    
        formExcluirCadastro.addEventListener("submit", event => {
            event.preventDefault();
            alert("Processando exclusão");
            excluirCadastroCliente();
        });
    }
    

        });


// Funções para navegação Funcionario]
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
