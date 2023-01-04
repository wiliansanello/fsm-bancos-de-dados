const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const category1 = 'TT6jrGbdps9lAPlJvCFF'
const categoryRef = db.collection('categories').doc(category1)

const doc = db.collection('products').doc()
doc
.set({
    product: 'SmartTV AOC 32 polegadas com Roku TV',
    price: 1500,
    categories: [categoryRef],
    categories2: [category1]

})
.then( snap =>{
    console.log(snap)})