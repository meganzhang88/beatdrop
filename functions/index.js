const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');


const { getAllPosts, postOnePost } = require('./handlers/posts');
const { signup, login, uploadImage, addUserDetails } = require('./handlers/users');


// posts routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);

// users route
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.https.onRequest(app);