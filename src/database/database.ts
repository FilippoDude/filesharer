import Database from "better-sqlite3";

const database = new Database("users.db");
database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, 
      userName TEXT NOT NULL,
      passwordHash TEXT NOT NULL
    )
`);
database.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY, 
    userId TEXT NOT NULL, 
    fileName TEXT NOT NULL
  )
`);
database.exec(`
  CREATE TABLE IF NOT EXISTS public_files (
    id TEXT PRIMARY KEY, 
    fileName TEXT NOT NULL
  )
`);
export default database;