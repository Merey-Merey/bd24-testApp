import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'database.db');

if (!fs.existsSync(dbPath)) {
  console.log('Creating new database file...');
  fs.writeFileSync(dbPath, ''); 
}

const db = new Database(dbPath);

function initializeDatabase() {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        bitrix_contact_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}
initializeDatabase();

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  bitrix_contact_id?: number;
  created_at: string;
}

export const userRepository = {
  create: (user: Omit<User, 'id' | 'created_at'>) => {
    console.log('Creating user:', user.email);
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (email, password, name, bitrix_contact_id) 
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      user.email, 
      hashedPassword, 
      user.name, 
      user.bitrix_contact_id
    );
    
    console.log('User created with ID:', result.lastInsertRowid);
    return result;
  },
  
  findByEmail: (email: string) => {
    console.log('Finding user by email:', email);
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },
  
  findById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  },
  
  findAll: () => {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all() as User[];
  },
  
  update: (id: number, updates: Partial<Omit<User, 'id' | 'created_at'>>) => {
    const fields = Object.keys(updates)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.values(updates);
    values.push(id);
    
    const stmt = db.prepare(`UPDATE users SET ${fields} WHERE id = ?`);
    return stmt.run(...values);
  }
};

export default db;