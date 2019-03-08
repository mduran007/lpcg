//--------------- Verificação de email e senha ---------------------
//funcao para verificar se é um email em um formato valido e senha nao nula
function verificarLogin (){  

    email= document.getElementById("inputemail").value;
    passwd= document.getElementById("inputpasswd").value;

     console.log(email+" - "+passwd);

     var i=true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   

    if (regex.test(email) == false){

        console.log("email: "+regex.test(email));
        alert("Digite um email valido");
        i=false;

    }

     if (passwd == ""){

        alert("Digite uma senha");
        i=false;
    }

    verificarBD(email, passwd);
}

//funcao para verifivar no banco de dados -incompleta-
function verificarBD(email, passwd){

    var responsavel ="admin@gmail.com"; //email de responsavel de teste
    var registrado = "aluno@gmail.com"; //email de aluno de teste

    if (email == responsavel){
        document.location.href = "./escolhepapel.html"; 
    }else if (email == registrado){
        document.location.href = "./presencaaluno.html";
    }else{
        alert("nao cadastrado");
    }

}


   var arrayAlunos = ["Zoé" , "Liz","Ayla","Maitê","Olívia","Pérola","Agnes","Lis","Lia","Aisha","Jade","Elisa","Helena","Cecília","Agatha"];
