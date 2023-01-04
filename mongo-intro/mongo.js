const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://localhost:27017/intro-mongo', (err, db) => {
  const pessoas = db.collection('pessoas')
  pessoas.insertOne({
    nome: 'Wilian Ansanello',
    nascimento: '1988-03-28'
  }, (err, res) => {
    console.log(err, res)
  })

  /*const cursorPessoas = pessoas.find({})
  cursorPessoas.forEach(doc => {
    console.log(doc)
  }, () => console.log('fim'))*/

  /*pessoas.update(
    {
      _id: mongodb.ObjectID('618675c3720ee1184bb0f933')
    },
    {
      $set: {
        nome: 'Mauricio Tenan Ansanello',
        nascimento: '1990-12-27'
      }
    }, (err, res) => console.log(err))
  pessoas.remove({
    _id: mongodb.ObjectID('618675c3720ee1184bb0f933')
  }, (err, res) => console.log(err))*/
})


