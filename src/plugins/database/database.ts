import Database from "better-sqlite3";

const database = new Database("users.db");
database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      userId TEXT NOT NULL,
      passwordHash TEXT NOT NULL
    )
`);
export default database;