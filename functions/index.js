const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');


const { getAllPosts, postOnePost, getPost, commentOnPost, likePost, unlikePost, deletePost} = require('./handlers/posts');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/users');
const {db} = require('./util/admin');

// posts routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.get('/post/:postId', getPost);
app.delete('/post/postId', FBAuth, deletePost)
app.post('/post/:postId/comment', FBAuth, commentOnPost)
//TODO: deletePost, likePost, unlikePost
app.get('/post/:postId/like', FBAuth, likePost)
app.get('/post/:postId/unlike', FBAuth, unlikePost)

// users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);


exports.api = functions.https.onRequest(app);

exports.deleteNotificationOnUnlike = functions.firestore.document('/likes/{id}')
    .onDelete((snapshot) => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    })


exports.createNotificationOnLike = functions.firestore.document('/likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/posts/${snapshot.data().postIs}`).get()
            .then(doc => {
                if(doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().username,
                        sender: snapshot.data().username,
                        type: 'like',
                        read: false,
                        postId: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });

    exports.createNotificationOnComment = functions.firestore.document('/comments/{id}')
        .onCreate((snapshot) => {
            db.doc(`/posts/${snapshot.data().postIs}`).get()
                .then(doc => {
                    if(doc.exists) {
                        return db.doc(`/notifications/${snapshot.id}`).set({
                            createdAt: new Date().toISOString(),
                            recipient: doc.data().username,
                            sender: snapshot.data().username,
                            type: 'comment',
                            read: false,
                            postId: doc.id
                        });
                    }
                })
                .then(() => {
                    return;
                })
                .catch(err => {
                    console.error(err);
                    return;
                });
        });

    