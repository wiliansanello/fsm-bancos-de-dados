const db = require('./db')
const fs = require('fs')

const initMigration = async(connection) => {
    const [ results ] = await connection.query(`show tables like 'migration_version'`)
    //nao iniciado
    if (results.length === 0){
        await connection.query('START TRANSACTION;')
        await connection.query(`
            CREATE TABLE migration_version (
                id INT NOT NULL AUTO_INCREMENT,
                version INT NOT NULL,
                PRIMARY KEY(id)
            );
        `)
        await connection.query('INSERT INTO migration_version (id, version) values (1,0)')
        await connection.query('COMMIT;')
    } 
}

const getCurrentVersion = async(connection) => {
    const [results] = await connection.query('select * from migration_version where id=1')
    return results[0].version
}

const migration = async() => {
    const connection = await db
    await initMigration(connection)

    const currentVersion = await getCurrentVersion(connection)
    let targetVersion = 100
    if(process.argv.length > 2){
        if(process.argv[2] === '--target-version' && process.argv[3]){
            targetVersion = parseInt(process.argv[3])
        }        
    }
    console.log('Migrating to: ', targetVersion)    
    const migrations = fs.readdirSync('./migrations')
    const migrationSortedToUp = migrations
        .map(version => {
            return version.split('.')[0]
        })
        .map(version => parseInt(version)) 
        .sort((a,b) => a - b)
        //ambos os retornos das funções acima e abaixo ordenam crescente
        /*{ if (a > b){ return 1 } else { return -1 } }*/

        const migrationSortedToDown = [...migrationSortedToUp].sort((a,b) => b - a)
        //ambos os retornos das funções acima e abaixo ordenam crescente
        /*{ if (a > b){ return -1 } else { return 1 } }*/
        
    for await(const migration of migrationSortedToUp){
        if(migration > currentVersion && targetVersion >= currentVersion){
            const migratingTo = require('./migrations/'+migration+'.js')
            await connection.query('START TRANSACTION;')
            if(migratingTo.up){
                await migratingTo.up(connection)
                console.log('Migration Up:', migration)
            }            
            await connection.query('update migration_version set version = ? where id = ?', [migration,1])
            await connection.query('COMMIT;')
            //await migratingTo.down(connection)
        }
    }

    for await(const migration of migrationSortedToDown){
        if(migration <= currentVersion && targetVersion < migration){
            const migratingTo = require('./migrations/'+migration+'.js')
            await connection.query('START TRANSACTION')
            if(migratingTo.down){
                await migratingTo.down(connection)
                console.log('Migration Up:', migration)
            }
            const currentMigration = migrationSortedToDown[migrationSortedToDown.indexOf(migration)+1] || 0
            await connection.query('update migration_version set version = ? where id = ?', [currentMigration, 1])
            await connection.query('COMMIT;')
        }
    }
    await connection.close()
    
}

migration()