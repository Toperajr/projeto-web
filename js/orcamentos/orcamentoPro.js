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
    

    const orderedList = document.getElementById('listaProd');

    listaprod.forEach(listaprod => {
        const tr = document.createElement('tr');
        
        tr.id = listaprod.uid;

        const idd = document.createElement('td')
        idd.innerHTML = listaprod.uid
        idd.setAttribute("style", "display: none")
        tr.appendChild(idd)

        const nome = document.createElement('td');
        nome.innerHTML = listaprod.nome;
        nome.className = "produtin"

        tr.appendChild(nome);

        
        const unid = document.createElement('td');
        const selectUn = document.createElement('select');
        selectUn.className = "opcaoo"
        const blank = document.createElement('option');
        blank.hidden = true
        blank.selected = false
        blank.innerHTML = "Selecione..."
        const opUn = document.createElement('option');
        opUn.value = "Un";
        opUn.innerHTML = "Un";
        const opCm = document.createElement('option');
        opCm.value = "cm";
        opCm.innerHTML = "cm";

        const opCm2 = document.createElement('option');
        opCm2.value = "cm²";
        opCm2.innerHTML = "cm²";

        const opM = document.createElement('option');
        opM.value = "m";
        opM.innerHTML = "m";

        const opM2 = document.createElement('option');
        opM2.value = "m²";
        opM2.innerHTML = "m²";

        const opM3 = document.createElement('option');
        opM3.value = "m³";
        opM3.innerHTML = "m³";

        const opKg = document.createElement('option');
        opKg.value = "Kg";
        opKg.innerHTML = "Kg";

        selectUn.append(blank,opUn,opCm,opCm2,opM,opM2,opM3,opKg);
        unid.appendChild(selectUn);       
        tr.appendChild(unid);

        const quant = document.createElement('td');
        
        const diminu = document.createElement('i');
        diminu.className = "fa-solid fa-angles-left";
        diminu.setAttribute("style", "font-size: 20px;" );

        const btnDim = document.createElement('button');
        btnDim.appendChild(diminu);
        btnDim.type = "button"
        btnDim.setAttribute("style", "border: 0px; background: transparent;" )

        const caixaQuant = document.createElement('input');
        caixaQuant.type = "number";
        caixaQuant.setAttribute("style", "width: 70px;" );
        caixaQuant.min = "0";
        caixaQuant.className = "quantity"

        const aument = document.createElement('i');
        aument.className = "fa-solid fa-angles-right";
        aument.setAttribute("style", "font-size: 20px;" );
        

        const btnAum = document.createElement('button');
        btnAum.appendChild(aument);
        btnAum.type = "button"
        btnAum.setAttribute("style", "border: 0px; background: transparent;" )

        quant.append(btnDim, caixaQuant, btnAum);
        tr.appendChild(quant);
        var au = 0;
        btnAum.addEventListener('click', event => {
            caixaQuant.value = null;
            event.stopPropagation();
            au += 5;
            caixaQuant.value += au;

        })
        btnDim.addEventListener('click', event => {
            if(caixaQuant.value > 0 && caixaQuant.value >= 5 && caixaQuant.value != null){
                caixaQuant.value = null;
                event.stopPropagation();
                au -= 5;
                caixaQuant.value += au;    
            }

        })
 
        orderedList.appendChild(tr);

    });

}