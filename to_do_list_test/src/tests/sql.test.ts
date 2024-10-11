import * as api from '../services/api'
import { Database } from 'sqlite3'

// https://stackoverflow.com/questions/41949724/how-does-db-serialize-work-in-node-sqlite3

// db works
test('db works', () => {
    const database = api.validDatabase();
    // console.log(database);
    expect(database).toBeInstanceOf(Database);
})

test('get all tables', async () => {
    api.dropTable("Trees");
    let results = await api.getAllTables();
    let cleanData = results.map((tree) => tree.name);
    expect(cleanData).toEqual([]);

    api.createTreeTable();
    results = await api.getAllTables();
    cleanData = results.map((tree) => tree.name);
    expect(cleanData).toEqual(["Trees"]);
    api.dropTable("Trees");
})

//create trees table
describe('create tables', () => {
    afterEach(async () => {
        const currentTestName = expect.getState().currentTestName;

        if (currentTestName === 'has existing Trees table') {
            const database = api.validDatabase();
            await database.run('DROP TABLE IF EXISTS Trees', async (err) => {
                if (err) {
                    console.error('Error:', err.message);
                } else {
                    await console.log('Trees table dropped.');
                }
            })
        }
    })

    test('no existing Trees table', () => {
        
    });

    test('has existing Trees table', () => {
        
    });

    
})



//create nodes table


// getting all tables


// getting all trees


// getting specific tree


// getting all nodes of a tree


// getting specific node of a tree


// updating specific node of a tree


// removing a node from a tree


// removing a tree