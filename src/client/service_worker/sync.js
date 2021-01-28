const idb = require('idb')
const openDB = idb.openDB
// import { openDB } from 'idb';



self.addEventListener('sync', async function (event) {


  event.waitUntil(favoriteUpdate());


});

async function favoriteUpdate() {
  // register.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: urlBase64ToUint8Array(publicKey)
  // }).then((subscription)=>{

  // })
  // Db index recuperer tous les objets

  const tasks = await getAllTasks()

  let promises = []

  tasks.forEach((task, i) => {

    const obj = {
        url: task.object.url,
        favorite: task.object.favorite,
        subscription: {
        endpoint: "https://fcm.googleapis.com/fcm/send/fTB13f50r3o:APA91bGxxQ2010woDvnNb6ox4DDc4eNxO71ZKRLxdrs71wFu_I6edKUXnairfo57N0XISGzbxWINsO2EEgAvu4DZTXGtzeGKtXj5bUSddga7x_SKYDwxllzso0OIGXSNSFoMNGZWgTGC",
        expirationTime: null,
        keys: {
          auth: "-OFlu36mdDDQcvVVI1-Z2g",
          p256dh: "BOZ5cNzgheVw57Enrxrjqk52QZuSrTMZgVfQSjuvaM-Vtxake23fyjZkpngAll6Uc8h57A3E9KWCGY8hQqpfUQk"
        }
      }   
    }
    console.log("in SYNC");
    const verb = task.object.favorite ? 'POST' : 'DELETE'
    promises.push(fetch("http://localhost:5000/subscribe", {
      method: verb,
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json"
      }
    })
      .then((result) => {
        console.log(result);
      }))
  })

  return Promise.all(promises).then(() => {
    console.log('done');
    deleteAllTasks()
  }
  );

}






async function getAllTasks() {
  const db = await openDB('Gallery', 1, {
  });

  if (db) {
    return await db.getAll('Sync')
  }
}

async function deleteAllTasks() {
  const db = await openDB('Gallery', 1, {
  });
  if (db) {
    return await db.clear('Sync')
  }

}