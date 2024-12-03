const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      data_category TEXT NOT NULL,
      record_count INTEGER NOT NULL,
      fields TEXT NOT NULL
    )
  `);

  // Seed user data
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync("password123", saltRounds);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
    "businessUser",
    hashedPassword,
  ]);

  // Seed product data
  db.run(`
    INSERT INTO products (data_category, record_count, fields)
    VALUES 
    ('Firmographic', 5250, 'Company name, Company address, Website'),
    ('Demographic', 10450, 'Age, Gender, Income level')
  `);
});

db.close();
console.log("Database initialized.");
