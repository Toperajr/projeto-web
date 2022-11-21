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
        hideLoading();
        const materiais = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
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

        const btnEditar = document.createElement('button');
        const iconeEdi = document.createElement('i')
        iconeEdi.className = "fa-solid fa-pencil"
        btnEditar.appendChild(iconeEdi)
        btnEditar.addEventListener("click", function () {
            window.location.href = "produtos.html?uid=" + listaprod.uid;
        });
        
        const btnDeletar = document.createElement('button');
        const iconeDel = document.createElement('i')
        iconeDel.className = "fa-regular fa-trash-can"
        btnDeletar.appendChild(iconeDel)
        

        const opcao = document.createElement('td');
        opcao.setAttribute("style", "width: 100px;");        
        opcao.append(btnEditar);
        opcao.append("ㅤ");
        opcao.append(btnDeletar);
        tr.append(opcao);
        console.log(listaprod);
        
 
        orderedList.appendChild(tr);
    });
}
function formatMoney(valor) {
    return `${valor.moeda} ${valor.preco.toFixed(2)}`
}
function abrirTela(){        
     window.location.href = "produtos.html?uid=" + listaprod.uid;
     console.log(listaprod.uid);
}
