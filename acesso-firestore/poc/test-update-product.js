const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const category1 = 'FQGJ9u72Gf2B7cWNi456'
const categoryRef = db.collection('categories').doc(category1)

const doc = db.collection('products').doc('jCQiz3NfjzbNqSiO66Hh')
doc
.update({
    product: 'Echo dot com Alexa',
    price: 499,
    categories: admin.firestore.FieldValue.arrayUnion(categoryRef),
    categories2: admin.firestore.FieldValue.arrayUnion(category1)

})
.then( snap =>{
    console.log(snap)})