const db = require('./firestore')

const findAll = async() => {
    const categoriesDB = await db.collection('categories').get()
    if(categoriesDB.empty){
        return[]
    }

const categories = []
categoriesDB.forEach(doc => {
    categories.push({
        ...doc.data(),
        id: doc.id
    })
})
return categories
}

const findAllPaginated = async({pageSize = 10, startAfter = ''}) => {
    //const pageSize = 1
    const categoriesDB = await db
                                .collection('categories')
                                .orderBy('category')
                                .startAfter(startAfter)
                                .limit(pageSize+1)
                                .get()
    if(categoriesDB.empty){
        return {
            data: [],
            total: 0
        }
    }
    const categories = []
    let total = 0
    categoriesDB.forEach(doc => {
        if(total < pageSize){
            console.log(doc.id)
            categories.push({
                ...doc.data(),
                id:doc.id
            })         
        }
        total++
    })
    return {
        data:categories,
        total: categories.length,
        hasNext: total > pageSize,
        startAfter: total > pageSize ? categories[categories.length-1].category : ''
    }   
}

const remove = async(id) =>{
    const doc = db.collection('categories').doc(id)
       //o set atualiza o documento inteiro. O update atualiza somente o campo que for passado 
    await doc.delete()
}

const create = async(data) => {
    const doc = db.collection('categories').doc()
    await doc.set(data)
    
}

const update = async(id, data) => {
    const doc = db.collection('categories').doc(id)
    //o set atualiza o documento inteiro. O update atualiza somente o campo que for passado 
    await doc.update(data)
    
}
 
module.exports = {
    findAll, 
    findAllPaginated,
    remove,
    create,
    update
}