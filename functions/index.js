const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/posts', (req, res) => {
    admin.firestore().collection('posts').get()
    .then((data) => {
        let posts = [];
        data.forEach((doc) => {
            posts.push(doc.data());
        });
        return res.json(posts);
    })
    .catch((err) => console.error(err));
})

app.post('/post', (req, res) => {

const newPost = {
    body: req.body.body,
    username: req.body.username,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
};
admin
    .firestore()
    .collection('posts')
    .add(newPost)
    .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully`});
    })
    .catch((err) => {
        res.status(500).json({ error: 'something went wrong'});
        console.error(err);
    });
});


exports.api = functions.https.onRequest(app);