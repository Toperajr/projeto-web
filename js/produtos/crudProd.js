const form = {
    nome: () => document.getElementById('txtNome'),
    valor: () => document.getElementById('txtValor'),
    marca: () => document.getElementById('txtMarca'),
    btnSalvar: () => document.getElementById('btnSalvar'),
    value: () => document.getElementById('value'),
    moeda: () => "R$"
}
function eNovoMaterial() {
    return getMaterialUid() ? false : true;
}

if (!eNovoMaterial()) {
    const uid = getMaterialUid();
    buscarMaterialPorUid(uid);
}

function getMaterialUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}


function buscarMaterialPorUid(uid) {
    showLoading();
    firebase.firestore()
        .collection("materiais")
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading();
            if (doc.exists) {
                addDadosTela(doc.data());
            } else {
                alert("Produto não encontrado");
                window.location.href = "produtos.html";
            }
        })
        .catch(() => {
            hideLoading();
            alert("Erro ao recuperar produto");
            window.location.href = "produtos.html";
        });
}

function addDadosTela(material) {

    form.nome().value = material.nome;
    form.valor().value = material.valor.preco;
    form.moeda().value = material.valor.moeda;
    form.marca().value = material.marca;
}

function salvarMaterial() {
    const material = criarMaterial();

    if (eNovoMaterial()) {
        salvar(material);
    } else {
        atualizar(material);
    }
}


function criarMaterial() {
    return {
        marca: form.marca().value,
        nome: form.nome().value,
        valor: {
            moeda: form.moeda(),
            preco: parseFloat(form.valor().value)
        },
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}

function salvar(material) {
    showLoading();
    firebase.firestore()
        .collection('materiais')
        .add(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "produtos.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar produto');
        })
}
function atualizar(material) {
    showLoading();
    firebase.firestore()
        .collection("materiais")
        .doc(getMaterialUid())
        .update(material)
        .then(() => {
            hideLoading();
            window.location.href = "produtos.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao atualizar produto');
        });
}