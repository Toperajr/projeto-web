function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
var db = firebase.firestore();
    
    db.collection("produtos").onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            var marca = change.doc.data().Marca;
            var nome = change.doc.data().Nome;
            var valor = change.doc.data().Valor 
            $("#listaprod").append("<tr>");
            $("#listaprod").append("<li"+change.doc.id+"'>"+todo_html+"</li>");
            $("#listaprod").append("<li"+change.doc.id+"'>"+todo_html+"</li>");
            $("#listaprod").append("<li"+change.doc.id+"'>"+todo_html+"</li>");
          
            
        });
    });