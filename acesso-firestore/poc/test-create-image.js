const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acesso-bd.firebase.io'
});

const db = admin.firestore()

const productId = 'ltRID2RYFh2NRYExm0rX'//'gJ1Tyk14dJyihopLBSAO'
const imageRef = db
                .collection('products')
                .doc(productId)
                .collection('images')
                .doc()
imageRef
    .set({
        description: 'my description',
        url: 'my image url'
    })
    .then(res=> {
        console.log(res)
    })

