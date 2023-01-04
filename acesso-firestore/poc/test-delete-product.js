const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const productId = 'apKc5Fq2C4ldrqigjblA'

const productRef = db.collection('products').doc(productId)

  db
  .collection('products')
  .doc(productId)
  .collection('images')
  .get()
  .then(imgSnapshot => {
    const exclusoes = []
    imgSnapshot.forEach(img => {
      exclusoes.push(
        db
        .collection('products')
        .doc(productId)
        .collection('images')
        .doc(img.id)
        .delete())
    })
    return Promise.all(exclusoes)
  })
    .then(()=>{
    return productRef.delete()
  })
  .then(()=>{
    console.log('everything was deleted')
  })
 
