import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run("INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('Jane Smith', 'jane@example.com')");
  
  db.run("INSERT INTO products (name, price) VALUES ('Laptop', 999.99)");
  db.run("INSERT INTO products (name, price) VALUES ('Headphones', 49.99)");
});

db.close();
