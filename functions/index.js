const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("hello, from ady!");
 });

 exports.getPosts = functions.https.onRequest((req, res) => {
    admin.firestore().collection('posts').get()
        .then(data => {
            let posts = [];
            data.forEach(doc => {
                posts.push(doc.data());
            });
            return res.json(posts);
        })
        .catch(err => console.error(err));
 })