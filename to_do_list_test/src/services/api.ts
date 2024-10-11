// import express from 'express';
import { Database } from 'sqlite3'
// const app = express();
let db = new Database('./src/data/database.db', (err) => {
    if (err) {
      console.error('Error creating database:', err.message);
    } else {
      // console.log('Database created successfully.');
    }
});

export function validDatabase() {
    return db;
}

export async function getAllTables(): Promise<{ name: string }[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, rows: { name: string }[]) => {
      if (err) {
        console.error('Error fetching tables:', err.message);
        reject(err);  // Reject the promise if there's an error
      } else {
        console.log('Tables in the database:', rows.map(row => row.name));
        resolve(rows);  // Resolve the promise with the rows
      }
    });
  });
}

export async function createTreeTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Trees (
    id TEXT UNIQUE PRIMARY KEY,
    name TEXT UNIQUE
    )`, (err) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        console.log('Table created successfully or already exists.');
      }
    });
}

export function addTree(treeId: string, treeName: string) {
  db.run(`INSERT INTO Trees (id, name)
    VALUES( ${treeId}, ${treeName})`, (err) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        console.log("Successfully added Tree to Trees table.")
      }
    });
}

export function getDataFromTree() {
  const result = db.all(`SELECT * FROM Trees`);
  console.log(result);
}

export function dropTable(tableName: string) {
  db.run(`DROP TABLE IF EXISTS ${tableName}`);
}