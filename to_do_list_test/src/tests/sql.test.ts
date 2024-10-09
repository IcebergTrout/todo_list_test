import * as api from '../services/api'
import { Database } from 'sqlite3'

// db works
test('db works', () => {
    const database = api.validDatabase();
    console.log(database);
    expect(database).toBeInstanceOf(Database);
})

// getting all tables


// getting all trees


// getting specific tree


// getting all nodes of a tree


// getting specific node of a tree


// updating specific node of a tree


// removing a node from a tree


// removing a tree