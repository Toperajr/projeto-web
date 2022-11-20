$(document).ready(function(){
    const firebase = require("firebase");
// Required for side-effects
    require("firebase/firestore");
    const firebaseConfig = {
        apiKey: "AIzaSyA2RZGLLxTSIlL8CpT7-Ca4Vd58mZIy8-k",
        authDomain: "projeto-web-43025.firebaseapp.com",
        projectId: "projeto-web-43025",
        storageBucket: "projeto-web-43025.appspot.com",
        messagingSenderId: "473487233712",
        appId: "1:473487233712:web:7102ef51072ebdd75d6175"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    
    db.collection("produtos").onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            var marca = change.doc.data().Marca;
            var nome = change.doc.data().Nome;
            var valor = change.doc.data().Valor 
            $("#todos").append("<li"+change.doc.id+"'>"+todo_html+"</li>");
            
          

            
        });
    });

});