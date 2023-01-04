const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelize-teste', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1'
})

sequelize.authenticate().then(()=>console.log('connected'))