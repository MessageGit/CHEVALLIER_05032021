const db = require("../models/index.js");
const Users = db.users; // import 'users' table
const Posts = db.posts; // import 'posts' table
const Reply = db.reply; // import 'reply' table

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Stock functions
function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
}

exports.login = (req, res, next) => { // Connexion
    if(!req.body.email || !req.body.passwrd)return res.status(400).send({message: "La requête soumise est incomplète."});

    Users.findOne({ where: {email: req.body.email} })
        .then(data => {
            if(!data)return res.status(401).send({error_code: 1, message: 'L\'identifiant saisie ne correspond à aucun compte.' });
            bcrypt.compare(req.body.passwrd, data.password)
            .then(valid => {
                if(!valid)return res.status(401).send({error_code: 2, message: 'Le mot de passe saisi est incorrect.' });
                const newToken = jwt.sign({userId: data.id }, 'TOK3N_S3CR3T', { expiresIn: '24h' });
                res.setHeader('Authorization', 'Bearer ' + newToken);
                res.status(201).send({error_code: 0, token: newToken + ' ' + data.id, message: 'Connexion établie.'});
            })
            .catch(error => res.status(500).send({error_code: 5, message: 'Une erreur est survenue (' + error + ')'}));
        })
        .catch(error => res.status(500).send({error_code: 3, message: 'Une erreur est survenue (' + error + ')'}));
}

exports.signup = (req, res, next) => { // Inscription
    const user_exist = 1;
    const email_exist = 2;

    if(!req.body.username || !req.body.email || !req.body.passwrd || req.body.passwrd != req.body.passwrdrpt)return res.status(400).send({message: "La requête soumise est incomplète."});
    
    // Check if email/username is already registered in database
    Users.findAll({where: db.sequelize.or({ email: req.body.email }, { username: req.body.username })})
        .then(data => {
            if(data.length == 0) { // Data is empty
                signupExec(0);
            } else { // Another email/user exist
                for(let i = 0; i < data.length; i++) {
                    if(data[i].username == req.body.username)return signupExec(user_exist);
                    if(data[i].email == req.body.email)return signupExec(email_exist);
                }
            }
        });

    // Registration execution
    function signupExec(conflict) {
        if(!conflict) { // Email and Username are available
            const hash = bcrypt.hashSync(req.body.passwrd, bcrypt.genSaltSync(10));
            const users = { email: req.body.email, username: req.body.username, password: hash, isAdmin: 0 };
            Users.create(users)
                .then(data => {
                    res.status(201).send({error_code: 0, message : 'Inscription effectuée.' });
                })
                .catch(err => { res.status(500).send({error_code: 9, message: "Une erreur est survenue (" + err + ")"}) });
        } else {
            // Username already registered
            if(conflict == user_exist) return res.status(400).send({error_code: 1, message: "Ce nom d'utilisateur est déjà utilisé par quelqu'un."});
            // Email already registered
            if(conflict == email_exist) return res.status(400).send({error_code: 2, message: "Cet email est déjà utilisé par quelqu'un."});
        }
    }
}

exports.getUserData = (req, res, next) => { // Get data of user 
    Users.findOne({ where: {id: getUserIdFromRequest(req)} })
        .then(data => { 
            if(data) {
                exportUserData(data.dataValues)
            } else {
                throw {};
            }
        })
        .catch(err => { res.status(401).send({message: 'Un problème d\'authentification est survenu.'})});

    function exportUserData(user) {
        delete user.password
        res.status(201).send({data: user, message: 'Authentification vérifiée.'})
    }
}

exports.setUserData = (req, res, next) => { // Set data of user
    const newImgLink = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    Users.findOne({ where: {id: getUserIdFromRequest(req)} })
        .then(data => {
            if(data.imgProfil) { // Delete last avatar (in storage)
                const lastUserImg = data.imgProfil.split('/images/')[1];
                fs.unlink('images/' + lastUserImg, () => {});
            }
            Users.update({imgProfil: newImgLink }, {where: { id: getUserIdFromRequest(req) }})
                .then(data => { // Set new avatar link
                    if(data == 1) res.status(201).send({imgLink: newImgLink})
                    else res.status(409);
                })
                .catch(err => { res.status(409).send({message: 'Une erreur est survenue (' + err + ')'}) });
        })
        .catch(err => { res.status(404).send({message: 'Certaines ressources semblent introuvables (' + err + ')'}) });
}

exports.deleteUser = (req, res, next) => { // Delete account
    const isDeleted = 1; let postCheck = 0;
    function deleteRepliesAndImg(i) { // Step n°1 - Delete all replies/images from user posts
        Posts.findAll({where: {ownerId: getUserIdFromRequest(req)}})
        .then(postData => {
            Reply.destroy({where: {postId: postData[i].dataValues.id}, force: true}) 
            if(postData[i].dataValues.fileImg) {
                const postImg = postData[i].dataValues.fileImg.split('/images/')[1];
                fs.unlink('images/' + postImg, () => {});
            }
            if(i == postData.length-1)return deleteUserRessources();
            else return deleteRepliesAndImg(postCheck++);
        });
    }
    function deleteUserRessources() { // Step n°2 - Delete all posts/replies from user (+ delete profil img)
        Posts.destroy({where: {ownerId: getUserIdFromRequest(req)}, force: true})
        Reply.destroy({where: {ownerId: getUserIdFromRequest(req)}, force: true})
        Users.findOne({where: {id: getUserIdFromRequest(req)}})
        .then(userdata => {
            if(userdata.imgProfil) {
                const lastUserImg = userdata.imgProfil.split('/images/')[1];
                fs.unlink('images/' + lastUserImg, () => {});
            }
            deleteUserAccount();
        })
        .catch(err => { res.status(409).send({message: 'Une erreur est survenue (' + err + ')'}) });
    }
    function deleteUserAccount() { // Step n°3 - Delete user account
        Users.destroy({where: {id: getUserIdFromRequest(req)}, force: true})
        .then(result => {
            if(result == isDeleted) {
                res.status(201).send({message: 'Votre compte a correctement été supprimé.'})
            } else { throw 'Votre compte n\'a pas été supprimé.' }
        })
        .catch(err => { res.status(409).send({message: 'Une erreur est survenue (' + err + ')'}) });
    }
    deleteRepliesAndImg(postCheck); // Process execution
}