import { openDB } from 'idb';

const db = await openDB('Gallery', 1, {
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

    db.createObjectStore('Sync', {
      // The 'id' property of the object will be the key.
      keyPath: 'payload',
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    });
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
    const tx = db.transaction('Gallery', 'readwrite');
    const store = tx.objectStore('Pictures');
    const value = await store.get(picUrl);
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

export async function addSyncTask(obj = null) {
  if (db) {
    // console.log(await db.getAllFromIndex('Pictures', 'date'));
    await db.add('Sync', {
      object: obj 
    });
  }
}