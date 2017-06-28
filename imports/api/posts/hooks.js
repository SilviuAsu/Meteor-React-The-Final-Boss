import Posts from "/imports/api/posts/collection";

Posts.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
    doc.userId = userId;
});