let db = {
    users: [
        {
            userId: '7vVlnbiv8mOlM2yqlr7xlvHSFp13',
            email: 'a@email.com',
            handle: 'a',
            createdAt: '2020-11-22T22:17:11.214Z',
            imageUrl: 'image/hehe/haha',
            bio: 'sample bio :)',
            website: 'https://spotifylink.com',
            location: 'NC, US'
        }
    ],
    posts: [
        {
            userHandle: 'a',
            body: 'post body',
            createdAt: '2020-11-22T22:17:11.214Z',
            likeCount: 5,
            commentCount:2
        }
    ],
    comments: [
        {
            userHandle: 'user',
            postId: 'postID',
            body: 'blah blah blah',
            createdAt: '2020-01-11T11:46:01.018Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'senderName',
            read: 'true | false',
            postId: 'QJqQ6Y5n7DPkMuXuqXSu',
            type: 'like | comment',
            createdAt: '2020-01-11T11:46:01.018Z'
        }
    ]
};
const userDetails = {
    // Redux data
    credentials: {
        userId: 'sample',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2020-01-11T11:46:01.018Z',
        imageUrl: 'image/hehe/haha',
        bio: 'sample bio :)',
        website: 'https://spotifylink.com',
        location: 'NC, US'
    },
    likes: [
        {
            userHandle: 'user',
            postId: 'randomId'
        },
        {
            userHandle: 'user',
            postId: 'randomId2'
        }
    ]
};