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

    console.log("in SYNC");
    const verb = task.favorite ? 'POST' : 'DELETE'
    promises.push(fetch("http://localhost:5000/subscribe", {
      method: verb,
      body: JSON.stringify(task.url),
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