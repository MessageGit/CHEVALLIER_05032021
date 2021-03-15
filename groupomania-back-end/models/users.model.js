module.exports = (sequelize, Sequelize) => {

    const users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        isAdmin: { type: Sequelize.INTEGER },
        imgProfil: { type: Sequelize.STRING }
    });
    return users;
};