import { Database } from 'sqlite3';
import DatabaseManager from '../services/databaseManager';
import { seedDatabase } from '../data/seed';

// https://stackoverflow.com/questions/41949724/how-does-db-serialize-work-in-node-sqlite3

const dbManager = new DatabaseManager('./src/data/database.db');

async function checkTables() {
  const tables: any[] = await new Promise<any>((resolve, reject) => {
    dbManager.accessDB().all(`SELECT * FROM sqlite_master WHERE type='table'`, (err, rows: { name: string }[]) => {
      if (err) return reject(err);
      else {
        const result = rows.map(row => row.name);
        resolve(result);
      }
    });
  });

  return tables;
}

beforeEach(async () => {
  await new Promise<void>((resolve, reject) => {
    dbManager.accessDB().run('DROP TABLE IF EXISTS todo_list_testTreeID', (err) => {
      if (err) {
        console.error("couldn't drop todo_list_testTreeID:", err.message);
        reject();
      }
      resolve();
    });
  });
  await new Promise<void>((resolve, reject) => {
    dbManager.accessDB().run('DROP TABLE IF EXISTS todo_list_trees', (err) => {
      if (err) {
        console.error("couldn't drop todo_list_trees:", err.message);
        reject();
      }
      resolve();
    });
  });


})
// db works
test('db works', () => {
  expect(dbManager.accessDB()).toBeInstanceOf(Database);
})

test('database should be seeded', async () => {
  // Check that the data was seeded correctly
  let tables: any[] = await checkTables();
  console.log(tables);
  expect(tables.length).toBe(0); // Check if there are no tables

  await seedDatabase();
  tables = await checkTables();

  expect(tables.length).toBeGreaterThan(0); // Check if at least one user was seeded
  expect(tables[0]).toBe('todo_list_trees');
});

//add tree to Trees and create table
test('add tree', async () => {
  // const treeId = 'testTreeId';
  let tables = await checkTables();
  console.log(tables);
  expect(tables).toHaveLength(0);

  await seedDatabase();
  await dbManager.addTree('testTreeID', 'test_tree');

  tables = await checkTables();

  const bruh = await new Promise<any>((resolve, reject) => {
    dbManager.accessDB().get(`SELECT name FROM todo_list_trees WHERE id = 'testTreeID'`, (err, row: {name: string}) => {
      if (err) return reject(err);
      else {
        resolve(row.name);
      }
    });
  });
  console.log(bruh);
  expect(bruh).toBe('test_tree');
  expect(tables).toContain('todo_list_testTreeID');
})

//remove tree from Trees and drop table


//add node to a tree table


//remove node from a tree table


//update node from a tree table