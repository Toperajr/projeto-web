function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function sair() {
    var confirmado = confirm('Deseja sair?');
    if(confirmado){
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html";
        }).catch(() => {
            alert('Erro ao fazer logout');
        })
    }
}