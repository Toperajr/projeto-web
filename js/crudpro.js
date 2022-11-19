const firebaseConfig = {
    apiKey: "AIzaSyA2RZGLLxTSIlL8CpT7-Ca4Vd58mZIy8-k",
    authDomain: "projeto-web-43025.firebaseapp.com",
    projectId: "projeto-web-43025",
    storageBucket: "projeto-web-43025.appspot.com",
    messagingSenderId: "473487233712",
    appId: "1:473487233712:web:7102ef51072ebdd75d6175"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();




const list = document.querySelector('.list');
const form = document.querySelector('form');
const bttn = document.querySelector('.bttn');

// Add item element to list
const addRecipie = (recipe, id) => {
const li = document.createElement('li');
li.className = 'list-item';
li.id = `${id}`;
li.innerHTML = `<div class="list-item__name"><span>Title:</span>${recipe.title}</div> <div class="created-at"><span>Created at:</span>${recipe.created_at}</div> <div clas="author"><span>Auther</span>${recipe.auther}</div> <button class="list-item__delete">Delete</button>`;
list.appendChild(li);
};

//add event listener to form to add new recipe
form.addEventListener('submit', e => {
e.preventDefault();
const now = new Date();
const recipe = {
title: form.recipie.value,
// author: form.re.value,
created_at: firebase.firestore.Timestamp.fromDate(now),
};
db.collection('recipies')
.add(recipe)
.then(() => {
console.log('receipes added');
})
.catch(err => {
console.log(err);
});
});

const deleteRecipie = id => {
const recipes = document.querySelectorAll('li');
recipes.forEach(recipe => {
if (recipe.getAttribute('id') === id) {
recipe.remove();
}
});
};

// db.collection('recipies') get all recipies

// db.collection('recipies')
// 	.get()
// 	.then(snapshot => {
// 		snapshot.forEach(doc => {
// 			console.log(doc.data());
// 			addRecipie(doc.data(), doc.id);
// 		});
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

const unSub = db.collection('recipies').onSnapshot(snapshot => {
snapshot.docChanges().forEach(change => {
const doc = change.doc;
if (change.type === 'added') {
addRecipie(doc.data(), doc.id);
} else if (change.type === 'removed') {
deleteRecipie(doc.id);
}
});
});

//delete event listener
list.addEventListener('click', e => {
if (e.target.classList.contains('list-item__delete')) {
const id = e.target.parentElement.getAttribute('id');
db.collection('recipies')
.doc(id)
.delete()
.then(() => {
    console.log('recipie deleted');
})
.catch(err => {});
li.remove();
}
});

// bttn.addEventListener('click', () => {
// 	unSub();
// });