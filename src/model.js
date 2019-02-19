class Pessoa {    
    constructor(nome){
        this.nome = nome;
    }
}
   
class User extends Pessoa {
    roles = []
    constructor(nome,login){
        super(nome)
        this.login = login;
    }
}


