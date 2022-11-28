const form = {
    descricao: () => document.getElementById('descricao'),
    nome: () => document.getElementById('clienteNome'),
    telefone: () => document.getElementById('contato'),
    endereco: () => document.getElementById('endereco'),
    btnSalvar1: () => document.getElementById('btnSalvar1'),
    ddd: () => "(69)"
}
function eNovocliente() {
    return getclienteUid() ? false : true;
}

if (!eNovocliente()) {
    const uid = getclienteUid();
    buscarclientePorUid(uid);
}

function getclienteUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}


function buscarclientePorUid(uid) {
    showLoading();
    firebase.firestore()
        .collection("clientes")
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading();
            if (doc.exists) {
                addDadosTela1(doc.data());
            } else {
                alert("Cliente não encontrado");
                window.location.href = "clientes.html";
            }
        })
        .catch(() => {
            hideLoading();
            alert("Erro ao recuperar cliente");
            window.location.href = "clientes.html";
        });
}

function addDadosTela1(cliente) {

    form.nome().value = cliente.nome;
    form.telefone().value = cliente.telefone.numero;
    form.ddd().value = cliente.telefone.ddd;
    form.endereco().value = cliente.endereco;
    form.descricao().value = cliente.descricao;

}

function salvarcliente() {
    const cliente = criarcliente();

    if(cliente.nome != ""){
        if(cliente.descricao != ""){
            if (eNovocliente()) {
                salvar(cliente);
            } else {
                atualizar(cliente);
            }
        }else{
            alert('Insira algo na descrição, nem que seja um espaço!')
        }


    }else{
        alert('O campo nome está nulo.')
    }

}


function criarcliente() {
    return {
        endereco: form.endereco().value,
        nome: form.nome().value,
        telefone: {
            ddd: form.ddd(),
            numero: form.telefone().value
        },
        user: {
            uid: firebase.auth().currentUser.uid
        },
        descricao: form.descricao().value,

    };
}

function salvar(cliente) {
    showLoading();
    firebase.firestore()
        .collection('clientes')
        .add(cliente)
        .then(() => {
            hideLoading();
            window.location.href = "clientes.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar produto');
        })
}
function atualizar(cliente) {
    showLoading();
    firebase.firestore()
        .collection("clientes")
        .doc(getclienteUid())
        .update(cliente)
        .then(() => {
            hideLoading();
            window.location.href = "clientes.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao atualizar clientes');
        });
}