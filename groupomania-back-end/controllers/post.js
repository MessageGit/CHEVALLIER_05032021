const db = require("../models/index.js");
const Posts = db.posts; // import 'posts' table
const Users = db.users; // import 'users' table
const Reply = db.reply; // import 'reply' table

const fs = require('fs');

// Stock functions
function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2]; 
}

exports.getAllPosts = (req, res, next) => {
    let dataPosts = []; let totalPosts = 0; let postCheck = 0;
    function getAllPosts() { // Step n°1 - Get all posts in database
        Posts.findAll({order: [['id', 'DESC']]})
        .then(data => { totalPosts = data.length;
            for(let i = 0; i < totalPosts; i++) {
                dataPosts[i] = data[i].dataValues;
                if(i == totalPosts-1)return getAllReplies(postCheck)
            }
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
    }
    function getAllReplies(i) { // Step n°2 - Get count replies for all posts
        Reply.findAll({where: {postId: dataPosts[i].id}})
        .then(replydata => {
            dataPosts[i].nbReplies = replydata.length;
            if(i == totalPosts-1)return getOwnerInfos(postCheck = 0)
            else return getAllReplies(postCheck++)
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
    }
    function getOwnerInfos(i) { // Step n°3 - Get posts owners informations
        Users.findOne({where: {id: dataPosts[i].ownerId}})
        .then(userdata => {
            if(userdata) { let userAvatar = '';
                if(!userdata.imgProfil) { userAvatar = './default-avatar.png' } else { userAvatar = userdata.imgProfil }
                dataPosts[i].ownerAvatar = userAvatar;
                dataPosts[i].ownerName = userdata.username;
                if(i == totalPosts-1)return res.status(201).send({postsList: dataPosts});
                else return getOwnerInfos(postCheck++);
            } else { throw 'L\'utilisateur ID ' + data[i].ownerId + ' lié au post n°' + data[i].id + ' introuvable.'; }
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
    }
    getAllPosts(); // Process execution
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
                                    Reply.destroy({where: {postId: postData.id}, force: true}) // Delete attached replies
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