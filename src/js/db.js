import { openDB } from 'idb';

const db = await openDB('Pictures', 1, {
  upgrade(db) {
    // Create a store of objects
    const store = db.createObjectStore('Pictures', {
      // The 'id' property of the object will be the key.
      keyPath: 'id',
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    });
    // Create an index on the 'date' property of the objects.
    store.createIndex('date', 'date');
  },
}); 

export async function addPictureToDb(pic) {
  if (db) {
    console.log(await db.getAllFromIndex('Pictures', 'date'));
    await db.add('Pictures', {
      title: 'picture',
      date: new Date(),
      url: pic.url,
    });
  }
}

export async function getAllPictures(){
  if (db) {
    return await db.getAllFromIndex('Pictures', 'date')
  }
}

