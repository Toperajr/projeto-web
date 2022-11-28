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
    tabelinhaProd: () => document.getElementById('listaProd'),
}


function salvarOrcamento() {
    const orcamento = criarOrcamento();

    if(orcamento.cliente != ""){
        if(orcamento.obra != ""){
            salvar(orcamento);
        }
        else{
            alert("está faltando o nome da obra")
        }
        
    }else{
        alert('O campo cliente está nulo.')
    }



}

function paraObjeto(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

function criarOrcamento() {

    return {
        obra: form.obra().value,
        data: form.data().value,
        cliente: form.cliente().value,
        descricao: {
            descri: form.descri().value,
            descrivalor: parseFloat(form.descrivalor().value)
        },
        produto: {
            materiais: null,
            qntmateriais: null
        },
        user: {
            uid: firebase.auth().currentUser.uid
        }

    
    };
}


function salvar(orcamento) {
    showLoading();
    var opcoes = document.getElementsByClassName('opcaoo');
    var nomesProd = document.getElementsByClassName('produtin');
    var qtnProdu = document.getElementsByClassName('quantity')
    const nomeProd = new Array();
    const quantiProd = new Array();
    const opcao = new Array();

    Array.from(opcoes).forEach(function(escala) {
        opcao.push(escala.value)
    });
    Array.from(nomesProd).forEach(function(produtins) {
        nomeProd.push(produtins.innerHTML)
    });
    Array.from(qtnProdu).forEach(function(quanti) {
        quantiProd.push(quanti.value)
    });
    console.log(nomeProd);
    console.log(quantiProd);
    console.log(opcao);
    const produtao = paraObjeto(nomeProd)
    const qtn = paraObjeto(quantiProd)
    const opicao = paraObjeto(opcao)

    produtao.qtd = qtn
    produtao.medida = opicao
    orcamento.produto = produtao;

    console.log(orcamento);
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
        .update(orcamento)
        .then(() => {
            hideLoading();
            window.location.href = "produtos.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao atualizar produto');
        });
}