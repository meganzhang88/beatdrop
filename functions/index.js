const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyBllU5j-_5NQpgSD6305_bA4bcKn2Jf1YI",
    authDomain: "beatdrop-637f3.firebaseapp.com",
    databaseURL: "https://beatdrop-637f3.firebaseio.com",
    projectId: "beatdrop-637f3",
    storageBucket: "beatdrop-637f3.appspot.com",
    messagingSenderId: "121046094806",
    appId: "1:121046094806:web:3710b88480aef3b9ca4a77",
    measurementId: "G-KJ8ZCFREJS"
  };


const firebase = require('firebase');
const { response } = require('express');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/posts', (req, res) => {
    db.collection('posts').orderBy('createdAt', 'desc').get()
    .then((data) => {
        let posts = [];
        data.forEach((doc) => {
            posts.push({
                postId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().username,
                createdAt: doc.data().createdAt,
            });
        });
        return res.json(posts);
    })
    .catch((err) => console.error(err));
})

app.post('/post', (req, res) => {

const newPost = {
    body: req.body.body,
    username: req.body.username,
    createdAt: new Date().toISOString()
};
db
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

// sign up route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    // validate data
let token;
let userId;

 db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
        if(doc.exists){
            return res.status(400).json({ handle: 'this handle is already taken'});
        } else {
            return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })   
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(idToken => {
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({ email: 'Email is already in use' });
        } else {
            return res.status(500).json({ error: err.code })
        }
    })
});
exports.api = functions.https.onRequest(app);