function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
firebase.auth().onAuthStateChanged(user => {
    if (user){
        adicionarOrc(user);

    }
})


function adicionarOrc(user) {
    showLoading();
    firebase.firestore()
    .collection('orcamentos')
    .where('user.uid', '==', user.uid)
    .get()
    .then(snapshot => {
        hideLoading();
        const orcamentos = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        addOrcamentosTela(orcamentos);
    })      
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao carregar orçamentos');
    })
}

function addOrcamentosTela(listaOrc) {
    const orderedList = document.getElementById('tabelita');

    listaOrc.forEach(listaOrc => {

        const tr = document.createElement('tr');
            
        tr.id = listaOrc.uid;
    
        const obra = document.createElement('td')
        obra.innerHTML = listaOrc.obra
        tr.appendChild(obra)
    
        const data = document.createElement('td');
        data.innerHTML = formatDate(addDays((listaOrc.data), 1));
        
        tr.appendChild(data);
    
        const cliente = document.createElement('td');
        cliente.innerHTML = listaOrc.cliente;
        tr.appendChild(cliente);
    
        const btnEditar = document.createElement('button');
        const iconeEdi = document.createElement('i')
        iconeEdi.className = "fa-solid fa-pencil"
        iconeEdi.setAttribute("style", "font-size: 20px; padding-right: 5px;" );
        btnEditar.setAttribute("style", "border: 0px; background: transparent;" )
        btnEditar.appendChild(iconeEdi)
        btnEditar.addEventListener("click", function () {
            alert("Opção não criada ainda")
        });
        
        const btnExportar = document.createElement('button');
        const iconeExpo = document.createElement('i')
        iconeExpo.className = "fa-solid fa-file-export"
        iconeExpo.setAttribute("style", "font-size: 20px; padding-right: 5px;" );
        btnExportar.setAttribute("style", "border: 0px; background: transparent;" )
        btnExportar.appendChild(iconeExpo)
        btnExportar.addEventListener('click', event => {
            alert("Opção não criada ainda")
        })
        
        const btnDeletar = document.createElement('button');
        const iconeDel = document.createElement('i')
        iconeDel.className = "fa-regular fa-trash-can"
        iconeDel.setAttribute("style", "font-size: 20px; padding-right: 5px;" );
        btnDeletar.setAttribute("style", "border: 0px; background: transparent;" )
        btnDeletar.appendChild(iconeDel)
        btnDeletar.addEventListener('click', event => {
            event.stopPropagation();
            pedirRemocaoOrc(listaOrc);
        })


        const opcao = document.createElement('td');
        opcao.setAttribute("style", "width: 200px;");        
        opcao.append(btnEditar);
        opcao.append(btnExportar);
        opcao.append(btnDeletar);
        tr.append(opcao);
        console.log(listaOrc);
        
 
        orderedList.appendChild(tr);

    });

}



function pedirRemocaoOrc(orcamento) {
    const shouldRemove = confirm('Deseja remover o orcamento: '+orcamento.obra+'?');
    if (shouldRemove) {
        removerOrcamento(orcamento);
    }
}
function removerOrcamento(orcamento) {
    showLoading();

    firebase.firestore()
        .collection("orcamentos")
        .doc(orcamento.uid)
        .delete()
        .then(() => {
            hideLoading();
            document.getElementById(orcamento.uid).remove();
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao remover orcamento');
        })
}

function formatDate(data) {
    return new Date(data).toLocaleDateString('pt-br');
}
function addDays(data, days) {
    var result = new Date(data);
    result.setDate(result.getDate() + days);
    return result;
  }