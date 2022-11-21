firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "home.html";
    }
})

function logins() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
            window.location.href = "home.html";
        }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
        console.log('error', error)
    });
}
function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    return error.message;
}
function getErrorMessage(error) {
    if (error.code == "auth/wrong-password") {
        return "Senha incorreta";
    }
    
    return error.message;
}
function getErrorMessage(error) {
    if (error.code == "auth/invalid-email") {
        return "Email/Senha incorretos";
    }
    return error.message;
}
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}
const form = {
    email: () => document.getElementById("email"),
    loginButton: () => document.getElementById("btnlogar"),
    password: () => document.getElementById("senha"),
} 