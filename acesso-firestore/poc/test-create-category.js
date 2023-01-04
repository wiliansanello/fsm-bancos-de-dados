const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const doc = db.collection('categories').doc()
doc
    .set({
        category:'Category criada via código'
    })
    .then( snap => {
        console.log(snap)
    })