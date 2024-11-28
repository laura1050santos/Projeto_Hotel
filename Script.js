//-----------CLIENTE---------

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
function cadastrar() {

    const formulario_cadastro = document.querySelector('#form')

    let nome = document.getElementById("nome").value

    let cpf = document.getElementById("cpf").value

    let nasc = document.getElementById("nasc").value

    let endereco = document.getElementById("endereco").value

    let email = document.getElementById("email").value

    let telefone = document.getElementById("telefone").value

    let senha = document.getElementById("senha").value



    let novoCliente = new Cliente(nome, cpf, nasc, endereco, email, telefone, senha)

    clientes.unshift(novoCliente)

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

}


function atualizar_dados() {

    //preciso de uma função que ache o cliente que está logado no site para mudar apaenas seus dados

    //e aqui é a função para atualizar esses dados





}
//-----------LOGIN----------
const form_login =document.getElementById("")
const nome = document.getElementById

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
        cadastro();
      
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

    const inputConfirmSenha = confirm_senha

    if (confirm_senha.value === "") {

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
//
class Reserva{
  constructor(cliente, checkIn, checkOut, quarto){
    this.cliente=cliente
    this.checkIn=checkIn
    this.checkOut=checkOut
    this.quarto=quarto
  }

}
