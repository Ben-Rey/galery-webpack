import { openDB } from 'idb';

const db = await openDB('Pictures', 1, {
  upgrade(db) {
    // Create a store of objects
    const store = db.createObjectStore('Pictures', {
      // The 'id' property of the object will be the key.
      keyPath: 'url',
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: false,
    });
    // Create an index on the 'date' property of the objects.
    store.createIndex('date', 'url');
  },
});

export async function addPictureToDb(pic) {
  if (db) {
    // console.log(await db.getAllFromIndex('Pictures', 'date'));
    await db.add('Pictures', {
      title: 'picture',
      date: new Date(),
      url: pic.url,
    });
  }
}

export async function AddFavorite(picUrl) {
  if (db) {
    const tx = db.transaction('Pictures', 'readwrite');
    const store = tx.objectStore('Pictures');
    const value = await store.get(picUrl);
    console.log(value);
    value.favorite = value.favorite ? false : true
    await store.put(value);
    await tx.done;
  }
}

export async function getAllPictures() {
  if (db) {
    return await db.getAllFromIndex('Pictures', 'date')
  }
}

