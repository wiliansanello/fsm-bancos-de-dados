/*versão com callback
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cat-products'
})

connection.query('select * from categories', (err, results, fields) => {
    console.log(err, results, fields)
})
*/

//versão promissificada 
const mysql = require('mysql2/promise')  

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })
    

    try{
        const [ results, fields ] = await connection.query('select * from categories')
        console.log(results, fields)
    } catch(err) {
        console.log(err)
    }
    }catch(err){
        console.log(err)
    }
}
run() 