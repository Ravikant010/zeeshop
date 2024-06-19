import "dotenv/config"
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, pool } from "../db/schema"
 async function  migrateDB() {
    
 
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" })
await pool.end()
}

migrateDB()