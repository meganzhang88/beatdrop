let db = {
    users: [
        {
            userId: 'sample',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2020-01-11T11:46:01.018Z',
            imageUrl: 'image/hehe/haha',
            bio: 'sample bio :)',
            website: 'https://spotifylink.com',
            location: 'NC, US'
        }
    ],
    posts: [
        {
            username: 'user',
            body: 'post body',
            createdAt: '2020-01-11T11:46:01.018Z',
            likeCount: 5,
            commentCount:2
        }
    ],
    comments: [
        {
            username: 'user',
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
            postId: '',
            type: 'like | comment',
            createdAt: ''
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
            username: 'user',
            postId: 'randomId'
        },
        {
            username: 'user',
            postId: 'randomId2'
        }
    ]
};