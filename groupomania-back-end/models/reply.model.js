module.exports = (sequelize, Sequelize) => {

    const reply = sequelize.define("reply", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ownerId: { type: Sequelize.INTEGER },
        postId: { type: Sequelize.INTEGER },
        txt: { type: Sequelize.STRING(60000) }
    });
    return reply;
};