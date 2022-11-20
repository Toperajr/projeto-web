function logins() {
    console.log('antes');
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
            window.location.href = "home.html";
        }).catch(error => {
      console.log('error', error)
    });
    console.log('depois')
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
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("btnlogar"),
    password: () => document.getElementById("senha"),
} 