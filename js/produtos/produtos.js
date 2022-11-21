function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
firebase.auth().onAuthStateChanged(user => {
    if (user){
        adicionarProd(user);
    }
})


function adicionarProd(user) {
    showLoading();
    firebase.firestore()
    .collection('materiais')
    .where('user.uid', '==', user.uid)
    .orderBy('valor.preco', 'desc')
    .get()
    .then(snapshot => {
        const materiais = snapshot.docs.map(doc => doc.data());
        addProdutosTela(materiais);
    })      
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao carregar materiais');
    })
}

function addProdutosTela(listaprod) {
    const orderedList = document.getElementById('listaprod');

    listaprod.forEach(listaprod => {
        const tr = document.createElement('tr');
        const nome = document.createElement('td');
        nome.innerHTML = listaprod.nome;
        tr.appendChild(nome);
        
        const valor = document.createElement('td');
        valor.innerHTML = formatMoney(listaprod.valor);
        tr.appendChild(valor);

        const marca = document.createElement('td');
        marca.innerHTML = listaprod.marca;
        tr.appendChild(marca);

        const opcao = document.createElement('td');
        opcao.innerHTML = "<td align ='left'><button class='btn btn-outline-primary  btn-sm' id='btnEditar'>Editar</button> &nbsp"+
        "<button class='btn btn-outline-danger  btn-sm' id='delete' >Excluir</button></td>";
        tr.appendChild(opcao);

        orderedList.appendChild(tr);
    });
}
function formatMoney(valor) {
    return `${valor.moeda} ${valor.preco.toFixed(2)}`
}

