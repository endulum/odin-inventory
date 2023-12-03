const Part = require('./models/part');
const Category = require('./models/category');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dotenv = require('dotenv');
dotenv.config();

const mongoDB = process.env.MONGO;

console.log(
  `\nThis is a reset helper script that populates the computer_parts_store database with default data for items and categories. If there were already items in the database, the database is emptied before items are added.\n`
);

main().catch(e => console.log(e));

async function main() { 
  console.log(`Connecting with URL "${mongoDB}"`);
  const conn = await mongoose.connect(mongoDB);
  console.log(`Connected to database "${conn.connection.name}"`);
  await emptyCollections();
  // todo: populate collections
  console.log(`Nothing left to do, closing connection.`);
  mongoose.connection.close();
}

async function emptyCollections() {
  const categories = (await Category.find({})).length;
  if (categories > 0) {
    console.log(`Found ${categories} categories. Deleting...`);
    await Category.deleteMany({});
  }

  const parts = (await Part.find({})).length;
  if (parts > 0) {
    console.log(`Found ${parts} parts. Deleting...`);
    await Part.deleteMany({});
  }
}