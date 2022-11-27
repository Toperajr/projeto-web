function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
firebase.auth().onAuthStateChanged(user => {
    if (user){
        adicionarCli(user);

    }
})


const form = {
    obra: () => document.getElementById('txtObra'),
    data: () => document.getElementById('txtData'),
    cliente: () => document.getElementById('caixaCli'),
    descri: () => document.getElementById('descricao'),
    descrivalor: () => document.getElementById('valorObra'),
    btnSalvar: () => document.getElementById('btnSalvar'),
    tabelinhaProd: () => document.getElementById('listaProd')
}


function salvarOrcamento() {
    const orcamento = criarOrcamento();
    salvar(orcamento);
}

function criarOrcamento() {
 
    return {
        obra: form.obra().value,
        data: form.data().value,
        descricao: {
            descri: form.descri().value,
            descrivalor: parseFloat(form.descrivalor().value)
        },
        produto: {


        }
    
    };
}

function salvar(orcamento) {
    showLoading();
    firebase.firestore()
        .collection('orcamentos')
        .add(orcamento)
        .then(() => {
            hideLoading();
            window.location.href = "orcamentos.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar orcamento');
        })
}
function atualizar(orcamento) {
    showLoading();
    firebase.firestore()
        .collection("orcamentos")
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