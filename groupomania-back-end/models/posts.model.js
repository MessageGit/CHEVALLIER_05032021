module.exports = (sequelize, Sequelize) => {

    const posts = sequelize.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ownerId: { type: Sequelize.INTEGER },
        txt: { type: Sequelize.STRING(60000) },
        fileImg: { type: Sequelize.STRING }
    });
    return posts;
};

// Updated (21/03/2021)