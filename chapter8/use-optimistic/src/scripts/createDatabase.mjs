import { createClient } from '@libsql/client';
const client = createClient({
  url: process.env.DB_URL,
});

await client.execute(
  `CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name STRING NOT NULL, 
    email STRING NOT NULL,
    reason STRING NOT NULL,
    notes STRING,
    done INTEGER
  )`,
);

client.close();

console.log('Database created');
