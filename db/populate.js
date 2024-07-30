#! /usr/bin/env node
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const SQL = fs.readFileSync(path.resolve(__dirname, 'starter-data.sql')).toString()

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION
  });
  await client.connect();

  await Promise.all(['parts', 'categories'].map(async (tableName) => {
    const { rows } = await client.query(`
      SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = '${tableName}'
      ) AS exists;
    `)
    if (rows[0].exists) await client.query(`DROP TABLE ${tableName}`)
  }))
  
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main()