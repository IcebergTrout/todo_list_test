// import express from 'express';
import { Database } from 'sqlite3'
// const app = express();
let db = new Database('./src/data/database.db', (err) => {
    if (err) {
      console.error('Error creating database:', err.message);
    } else {
      console.log('Database created successfully.');
    }
});

export function validDatabase() {
    return db;
}
