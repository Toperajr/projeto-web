
const form = {
    nome: () => document.getElementById('txtNome'),
    valor: () => document.getElementById('txtValor'),
    marca: () => document.getElementById('txtMarca'),
    btnSalvar: () => document.getElementById('btnSalvar'),
    value: () => document.getElementById('value'),

}

function criarMaterial() {
    return {
        marca: form.marca().value,
        nome: form.nome().value,
        valor: {
            moeda: "R$",
            preco: parseFloat(form.valor().value)
        },
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}
function salvarMaterial() {
    showLoading();
    const material = criarMaterial();

    firebase.firestore()
        .collection('materiais')
        .add(material)
        .then(() => {
            hideLoading();
            window.location.href = "produtos.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar produto');
        })
}
