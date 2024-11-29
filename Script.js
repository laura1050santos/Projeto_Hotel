let clientes=[]
let usuarioLogado=null
let reservas = []
let gastos =[]
//----------CLIENTE---------

class Cliente {
    constructor(nome, cpf, nasc, endereco, email, telefone, senha) {
        this.nome = nome
        this._cpf = cpf
        this._nasc = nasc
        this.endereco = endereco
        this.email = email
        this.telefone = telefone
        this.senha = senha

    }
    get cpf() {
        return this._cpf
    }
    get nasc() {
        return this._nasc
    }


}
function cadastrar(event) {
    event.preventDefault()
    const formulario_cadastro = document.querySelector('#form')
    let nome = document.getElementById("nome").value.trim()
    let cpf = document.getElementById("cpf").value.trim()
    let nasc = document.getElementById("nasc").value.trim()
    let endereco = document.getElementById("endereco").value.trim()
    let email = document.getElementById("email").value.trim()
    let telefone = document.getElementById("telefone").value.trim()
    let senha = document.getElementById("senha").value.trim()

    let novoCliente = new Cliente(nome, cpf, nasc, endereco, email, telefone, senha)
    clientes.unshift(novoCliente)
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

}
//--------------ATUALIZAR DADOS-----------------

    
function atualizarDados(event){
    event.preventDefault()
        if (!usuarioLogado) {
            alert("Faça login para continuar.");
            return;
        } else{

        // Validação básica (adicione mais validações conforme necessário)
        const novoEmail = document.getElementById("novo-email").value.trim();
        const novoEndereco = document.getElementById("novo-endereco").value.trim();
        const novoTelefone = document.getElementById("novo-telefone").value.trim();
        const novaSenha = document.getElementById("nova-senha").value.trim();

        if (!novoEmail && !novoEndereco && !novoTelefone && !novaSenha) {
            alert("Preencha pelo menos um campo para atualizar.");
            return;
        }

        // procura o cliente na lista e atualiza os dados


        for (let cont = 0;  cont <clientes.length   ;cont++) {
            if (usuarioLogado.cpf=== clientes[cont].cpf) {
                if (novoEmail !== '') cliente[cont].email = novoEmail;
                if (novoEndereco !== "") cliente[cont].endereco = novoEndereco;
                if (novoTelefone !== "") cliente[cont].telefone = novoTelefone;
                if (novaSenha !== "") cliente[cont].senha = novaSenha;
            }
        }
        alert("Dados atualizados com sucesso!");
    }
};
function excluirReservasCliente(cliente) { 
    reservas = reservas.filter(reserva => reserva.cliente !== cliente);
    }

function excluirCadastro(){
    for (let cont = 0;  cont <clientes.length   ;cont++) {
        if (usuarioLogado.cpf === clientes[cont].cpf) {
            excluirReservasCliente(clientes[cont])
            clientes = clientes.filter(cliente => cliente !== clientes[cont]);
            usuarioLogado=null
        }}}

//redirecionar para inicio


//-----------LOGIN---------- precisa do array clientes. E identificar os IDs
function Login(event){
    event.preventDefault()
    const nome = document.getElementById("1").value
    const email = document.getElementById("2").value
    const senha = document.getElementById("3").value
    const clienteEncontrado = clientes.find(c => c.nome === nome && c.email === email && c.senha === senha)
    if (clienteEncontrado) {
        alert("login realizado com sucesso ")
        usuarioLogado = ["cliente", clienteEncontrado.nome, clienteEncontrado.cpf]
        window.location.href = "" //redirecionar para sobre
    } else {
        alert("login invalido")
    }
      
}

//------------LOGOUT-------------
function logout(){
    usuarioLogado= null

    alert('logout realizado com sucesso')
}
//------------VALIDAÇÃO-----------
const form = document.getElementById("form")
const nome = form.getElementById("nome")
const cpf = form.getElementById("cpf")
const email = form.getElementById("email")
const datanasc = form.getElementById("datanasc")
const celular = form.getElementById("celular")
const senha = form.getElementById("senha")
const confirm_senha = form.getElementById("confirm_senha")

form.addEventListener("submit", event => {
    event.preventDefault();
    checkInputNome()
    checkInputEmail()
    checkInputSenha()
    checkInputCPF()
    checkInputConfirmSenha()
    checkInputCelular()

    const formValido = document.querySelectorAll(".form_conteudo.error").length === 0;
    if (formValido) {
        // Chama a função de cadastro com os valores do formulário
        cadastrar();
    } else {
        console.log("Corrija os erros antes de continuar.");
    }
})

function checkInputNome() {
    const inputNome = nome.value
    if (nome.value === "") {
        errorInput(nome, "digite seu nome")
    } else {
        const formItem = nome.parentElement;
        formItem.className = "form_conteudo"
    }
}
function checkInputCPF() {
    const inputCPF = cpf.value
    if (inputCPF === "") {
        errorInput(cpf, "digite seu cpf")
    } else if (inputCPF.length < 14) {
        errorInput(cpf, "cpf invalido, lembre de digitar com pontos e traço(-)")
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form_conteudo"
    }
}

function checkInputEmail() {
    const inputEmail = email.value
    if (inputEmail === "") {
        errorInput(email, "digite seu email")
    } else {
        const formItem = email.parentElement;
        formItem.className = "form_conteudo"
    }
}

function checkInputCelular() {
    const inputCelular = celular.value
    if (inputCelular === "") {
        errorInput(celular, "digite seu numero de celular com ddd")
    } else {
        const formItem = celular.parentElement;
        formItem.className = "form_conteudo"
    }
}
function checkInputSenha() {
    const inputSenha = senha.value
    if (inputSenha === "") {
        errorInput(senha, "digite sua senha")
    } else if (inputSenha.length < 8) {
        errorInput(senha, "a senha deve conta 8 caracteres ou mais")
    } else {
        const formItem = senha.parentElement;
        formItem.className = "form_conteudo"

    }
}
function checkInputConfirmSenha() {
    const inputConfirmSenha = confirm_senha.value
    if (inputConfirmSenha === "") {
        errorInput(confirm_senha, "digite sua senha")
    } else if (confirm_senha.value !== senha.value) {
        errorInput(confirm_senha, "as senhas devem ser iguais")
    } else {
        const formItem = confirm_senha.parentElement;
        formItem.className = "form_conteudo"
    }
}
function errorInput(input, mensagem) {
    const formItem = input.parentElement;
    const textoMensagem = formItem.querySelector("a");
    textoMensagem.innerText = mensagem;
    formItem.className = "form_conteudo error";
}
//-----------------RESERVAS---------------------
class Reserva {
    constructor(id,cliente, checkIn, checkOut, quarto) {
        this.id= id
        this.cliente = cliente
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.quarto = quarto
    }

}


function calcularPrecoReserva(event) {
    event.preventDefault()

         
    const tipoQuarto = document.getElementById("tipoQuarto").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);

    if (checkOut <= checkIn) {
        alert("A data de check-out deve ser maior que a de check-in!");
        return;
    }

    const precoPorDia = {
        suite_solteiro: 100,
        suite_casal:200,
        suite_deluxe:400,
        cobertura:1000,

    };

    const dias = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const precoTotal = dias * precoPorDia[tipoQuarto];
    

    document.getElementById("precoTotal").textContent = `Preço total: R$ ${precoTotal}`;
    document.getElementById("confirmarReserva").style.display = "block";

    }

    function confirmarReserva(event) {
        event.preventDefault();

        if (!usuarioLogado) {
            alert("Faça login para continuar.");
            window.location.href = "login.html";
            return;
        }
        const tipoQuarto = document.getElementById("tipoQuarto").value;
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        if (!tipoQuarto || !checkIn || !checkOut) {
            alert("Todos os campos são obrigatórios.");
            return;
        }
        let clienteEncontrado = false;
    
        for (let cont = 0; cont < clientes.length; cont++) {
            if (usuarioLogado.cpf === clientes[cont].cpf) {
                clienteEncontrado = true;
                if (!clienteEncontrado) {
                    alert("Cadastro do cliente não encontrado.");
                    //-----------------REDIRECIONAR PARA LOGIN_C---------------
                    return;
                }
                const novaReserva = new Reserva(clientes[cont], checkIn, checkOut, tipoQuarto);
                reservas.unshift(novaReserva);
                alert("Reserva confirmada com sucesso!");
                break;
            }
        }
    

    }
    //--------------------QUARTOS-----------------
     

//======================================================FUNCIONARIOS=====================================================
