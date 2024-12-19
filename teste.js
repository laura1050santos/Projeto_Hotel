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

    getNome() {
        return this.#nome;
    }

    getCpf() {
        return this.#cpf;
    }

    getData() {
        return this.#data;
    }

    getEndereco() {
        return this.#endereco;
    }

    getEmail() {
        return this.#email;
    }

    getTelefone() {
        return this.#telefone;
    }

    getSenha() {
        return this.#senha;
    }

    getConta() {
        return this.#conta;
    }

    setEndereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    setEmail(novoEmail) {
        this.#email = novoEmail;
    }

    setTelefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    setSenha(novaSenha) {
        this.#senha = novaSenha;
    }

    atualizarConta(valor) {
        this.#conta += valor;
    }

    quitarDivida() {
        this.#conta = 0;
    }
}
let usuarios=[]
let slasdkskkj= new Usuario('laura','1234567467','24334','','2','235767675','kdslfç',0)
// Exemplo de busca de usuário
let email = "2"
let senha='kdslfç'
usuarios.push(slasdkskkj)
let cliente = usuarios.find(user => user.getEmail() === email && user.getSenha() === senha);

if (cliente) {
    console.log(`Usuário encontrado: ${cliente.getNome()}`);
} else {
    console.log('Usuário não encontrado.');
}
