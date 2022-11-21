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


function adicionarCli(user) {
    showLoading();
    firebase.firestore()
    .collection('clientes')
    .where('user.uid', '==', user.uid)
    .get()
    .then(snapshot => {
        hideLoading();
        const clientes = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        addClientesTela(clientes);
    })      
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao carregar clientes');
    })
}

function addClientesTela(listacli) {
    const orderedList = document.getElementById('listacli');

    listacli.forEach(listacli => {
        const tr = document.createElement('tr');
        
        tr.id = listacli.uid;
        const nome = document.createElement('td');
        nome.innerHTML = listacli.nome;
        tr.appendChild(nome);
        
        const telefone = document.createElement('td');
        telefone.innerHTML = formatTelefone(listacli.telefone);
        tr.appendChild(telefone);

        const endereco = document.createElement('td');
        endereco.innerHTML = listacli.endereco;
        tr.appendChild(endereco);

        const descricao = document.createElement('td');
        descricao.innerHTML = listacli.descricao;
        tr.appendChild(descricao);

        const btnEditar = document.createElement('button');
        const iconeEdi = document.createElement('i')
        iconeEdi.className = "fa-solid fa-pencil"
        btnEditar.appendChild(iconeEdi)
        btnEditar.addEventListener("click", function () {
            window.location.href = "produtos.html?uid=" + listacli.uid;
        });
        
        const btnDeletar = document.createElement('button');
        const iconeDel = document.createElement('i')
        iconeDel.className = "fa-regular fa-trash-can"
        btnDeletar.appendChild(iconeDel)
        btnDeletar.addEventListener('click', event => {
            event.stopPropagation();
            pedirRemocaoCli(listacli);
        })

        const opcao = document.createElement('td');
        opcao.setAttribute("style", "width: 100px;");        
        opcao.append(btnEditar);
        opcao.append("ㅤ");
        opcao.append(btnDeletar);
        tr.append(opcao);
        console.log(listacli);
        
 
        orderedList.appendChild(tr);
    });
}
function formatTelefone(telefone) {
    return `${telefone.ddd} ${telefone.numero}`
}
function pedirRemocaoCli(cliente) {
    const shouldRemove = confirm('Deseja remover o cliente: '+cliente.nome+'?');
    if (shouldRemove) {
        removerCliente(cliente);
    }
}
function removerCliente(cliente) {
    showLoading();

    firebase.firestore()
        .collection("clientes")
        .doc(cliente.uid)
        .delete()
        .then(() => {
            hideLoading();
            document.getElementById(cliente.uid).remove();
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao remover cliente');
        })
}