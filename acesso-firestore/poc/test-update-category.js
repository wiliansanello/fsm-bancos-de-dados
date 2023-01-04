const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const doc = db.collection('categories').doc('S2zMbA1wyysFbYHl9Twt')
doc
    //o set atualiza o documento inteiro. O update atualiza somente o campo que for passado 
    .update({
        category:'Novo nome com update'
    })
    .then( snap => {
        console.log(snap)
    })