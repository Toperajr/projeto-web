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
        console.log(user.uid)
    }
})



function adicionarCli(user) {
    if (user){
        showLoading();
        firebase.firestore()
        .collection('clientes')
        .where('user.uid', '==', user.uid)
        .orderBy('nome', 'desc')
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
 
}

function addClientesTela(listacli) {
    const orderedList = document.getElementById('listacli');
    const caixaCli = document.getElementById('caixaCli');
    listacli.forEach(listacli => {
        const tr = document.createElement('tr');
        
        tr.id = listacli.uid;
        const nome = document.createElement('td');
        nome.innerHTML = listacli.nome;
        nome.addEventListener('click', event => {
            event.stopPropagation();
            caixaCli.value = nome.innerHTML;
            const modal = document.querySelector('.modal-container')
            modal.classList.remove('active')

        })
        tr.appendChild(nome);
        
        orderedList.appendChild(tr);

    });
}
//Tabelinha
