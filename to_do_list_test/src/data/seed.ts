import { Database } from 'sqlite3'

let db: Database;

function connectDB() {
  db = new Database('./src/data/database.db', (err) => {
    if (err) {
      console.error(`Couldn't connect to database:`, err.message);
    }
  });
}

export async function seedDatabase() {
  return new Promise<void>((resolve, reject) => {
    connectDB();
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS todo_list_trees (
          id TEXT PRIMARY KEY UNIQUE,
          name TEXT NOT NULL UNIQUE
        )`, (err) => {
        if (err) {
          console.error('Seeding failed:', err.message); // Log the error if seeding fails
          return reject(err);
        }
        resolve();
      }
      );
    });
    db.close();
  });
}

export async function clearDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      let treeTables: any[] = [];
      db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, rows: { name: string }[]) => {
        if (err) {
          console.error('Error fetching tables:', err.message);
        } else {
          rows.map(row => row.name);
          treeTables = rows;
          // console.log('Tables in the database:', rows.map(row => row.name));
        }
      });

      for (const x in treeTables) {
        db.run(`DROP TABLE IF EXISTS ${x}`);
      }

      db.run(`DELETE FROM Trees`, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

// Close the database connection when the script is finished
export async function closeDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

if (require.main === module) {
  closeDatabase();
}

