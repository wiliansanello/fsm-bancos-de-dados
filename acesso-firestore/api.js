const categories = require('./categories')
const products = require('./products')

const testes = async() => {
    /*await categories.create({
        category: 'Categoria'
    })*/
    // await categories.update('<id_categoria>', {category: 'Categoria atualizada'})
    // await categories.remove('<id_categoria')
    /*const cats = await categories.findAll()
    console.log(cats)*/
    const cats = await categories.findAll({})
    console.log(cats)

    /*await products.create({
        product: 'New product',
        price: 997,
        categories: ['TT6jrGbdps9lAPlJvCFF']
    })*/
    /*await products.update('Hx6fbwtJk6lQuNiYho2W',{
        product: 'New name',
        categories: ['FQGJ9u72Gf2B7cWNi456']
    })*/
   // await products.remove('Hx6fbwtJk6lQuNiYho2W')

    /*const catsPaginated = await categories.findAllPaginated({ 
        pageSize:1, startAfter: 'Nova categoria' 
    })
    console.log(catsPaginated)*/

    /*await products.addImage('KxBVMEkVxCEmbre9YiWL',{
            description: 'new Image',
            url: 'url'
        })*/

    /*const prods = await products.findAll()
    console.log(prods)*/
    const prodsNewVersion = await products.findAllPaginated({ pageSize: 1, startAfter: ''})
    console.log(prodsNewVersion.data[0].imgs)
}

testes()