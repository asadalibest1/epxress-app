const createdAndModified = () => ({

    lastModified: new Date(),
    created_at: new Date(),
});
const lastModified = () => ({

    lastModified: new Date(),
});
module.exports = {
    createdAndModified,
    lastModified
}



