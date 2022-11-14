function logar(){

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == "admin" && senha == "admin")
    //parabéns vc achou a senha :)
    {
        alert('Sucesso');
        location.href = "home.html";
    }else{
        alert('Usuario ou senha incorretos');
    }

}