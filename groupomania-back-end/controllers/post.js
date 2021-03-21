const db = require("../models/index.js");
const Posts = db.posts; // import 'posts' table
const Users = db.users; // import 'users' table

const fs = require('fs');

// Stock functions
function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2]; 
}

exports.getAllPosts = (req, res, next) => {
    let dataPosts = [];

    Posts.findAll({ order: [['id', 'DESC']] })
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                Users.findOne({ where: {id: data[i].dataValues.ownerId} })
                .then(userdata => {
                    if(userdata) {
                        let userAvatar = userdata.imgProfil;
                        if(!userAvatar) { userAvatar = './default-avatar.png' }
                        data[i].dataValues.ownerName = userdata.username;
                        data[i].dataValues.ownerAvatar = userAvatar;
                        dataPosts.push(data[i].dataValues)
                        if(i == data.length-1)return res.status(201).send({postsList: dataPosts});
                    } else { throw 'L\'utilisateur ID ' + data[i].ownerId + ' lié au post n°' + data[i].id + ' introuvable.'; }
                });
            }
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

exports.createPost = (req, res, next) => {
    let newPost = {}; let imgLink = '';
    if(req.file) { imgLink = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; }
    newPost = { ownerId: getUserIdFromRequest(req), txt: req.body.txt, fileImg: imgLink }
    
    Posts.create(newPost)
        .then(data => {
            res.status(201).send({data: data, message : 'Votre post a correctement été créé.'});
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.id; const isDeleted = 1; let isAdmin = false;
    Posts.findOne({ where: {id: postId} })
        .then(postData => {
            Users.findOne({ where: {id: getUserIdFromRequest(req)} })
                .then(userData => { // Check user permissions
                    if(userData.isAdmin == 1) { isAdmin = true; } else { isAdmin = false; }
                    if(isAdmin || postData.ownerId == userData.id) { // User is admin or owner of this post
                        Posts.destroy({ where: { id: postId }, force: true })
                            .then(result => { // Destroy this post
                                if(result == isDeleted) {
                                    if(postData.fileImg) { // Delete attached img (in storage)
                                        const postImg = postData.fileImg.split('/images/')[1];
                                        fs.unlink('images/' + postImg, () => {});
                                    }
                                    res.status(201).send({message : 'Ce post a correctement été supprimé.'});
                                } else { throw 'Ce post n\'a pas pu être correctement supprimé.' }
                            })
                            .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
                    } else return res.status(403).send({message: "Vous n'avez pas la permission pour supprimer ce post."})
                })
                .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

exports.editPost = (req, res, next) => {
    const postId = req.params.id; const isUpdated = 1; let isAdmin = false;
    Posts.findOne({ where: {id: postId} })
        .then(postData => {
            Users.findOne({ where: {id: getUserIdFromRequest(req)} })
                .then(userData => { // Check user permissions
                    if(userData.isAdmin == 1) { isAdmin = true; } else { isAdmin = false; }
                    if(isAdmin || postData.ownerId == userData.id) { // User is admin or owner of this post
                        Posts.update({txt: req.body.txt}, { where: { id: postId } })
                            .then(result => { // Update this post
                                if(result == isUpdated) {
                                    res.status(201).send({message : 'Ce post a correctement été modifié.'});
                                } else { throw 'Ce post n\'a pas été correctement modifié.' }
                            })
                            .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
                    } else return res.status(403).send({message: "Vous n'avez pas la permission pour modifier ce post."})
                })
                .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

// Updated (21/03/2021)