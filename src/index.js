const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ images: [], count: 0 })
    .write()

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = "BJUZgBWz1ctYaCXtxs8ks2TgFfR9ehswDHDjS-kIRQ4suyy247IOHJ8skbFZLtZNIreJUevpyvi9p4QYFag-MpU";
const privateVapidKey = "7WoAeESZo53iNxhQKMl9gRAJ-DxLmKtuUy6HYGgHJ7Q";


webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
    // Add a post
    db.get('images')
        .push({ title: req.body.title, url: req.body.url })
        .write()
    // Increment count
    db.update('count', n => n + 1)
        .write()

    // Create payload
    const payload = 'The image is saved in My Favourites';

    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json("OK");

    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

app.get("/favourites", (req, res) => {
    let myFavourites = db.get('images').value();
    if (myFavourites) {
        res.status(201).json(myFavourites);
    }
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

