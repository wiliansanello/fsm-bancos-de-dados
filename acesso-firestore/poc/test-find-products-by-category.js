const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const category1 = 'TT6jrGbdps9lAPlJvCFF'
const categoryRef = db.collection('categories').doc(category1)

const products = db
  .collection('products')
  .where('categories', 'array-contains', categoryRef)
  .get()

products.then(snapshot => {
    snapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data())
        db
        .collection('products')
        .doc(doc.id)
        .collection('images')
        .get()
        .then(imgSnapshot => {
          imgSnapshot.forEach(img => {
            console.log(' img ==> ', img.id, ' => ', img.data())
          })
        })
    })
})