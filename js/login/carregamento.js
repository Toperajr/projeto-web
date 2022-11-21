function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralize");

    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);

    document.body.appendChild(div);
    
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}
function alertinha(){
    alert("Algum erro aconteceu, será que essa opção não foi implementada?  ¯|_(ツ)_/¯");
}