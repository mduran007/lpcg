export class Usuario {
    nome: string;
    email: string;
    senha: string;

    constructor(nome: string, email: string, senha: string){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

function sauda_usuario_logado(u: Usuario){
         return "Ola, " + u.nome;
}

let uWagner = {
    nome: "Wagner Marques",
    email: "wagnerdocri@gmail.com",
    senha: "1234"};

console.log(sauda_usuario_logado(uWagner))


