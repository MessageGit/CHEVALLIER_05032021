const db = require("../models/index.js");
const Reply = db.reply; // import 'reply' table
const Users = db.users; // import 'users' table

// Stock functions
function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2]; 
}

exports.getAllReplies = (req, res, next) => {
    let dataReplies = []; let replyCheck = 0;
    function getAllReplies() { // Step n°1 - Get all replies for this post
        Reply.findAll({where: {postId: req.params.id}})
        .then(data => {
            for(let i = 0; i < data.length; i++) { dataReplies[i] = data[i].dataValues; }
            getOwnerInfos(replyCheck);
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
    }
    function getOwnerInfos(i) { // Step n°2 - Get replies owners informations
        Users.findOne({where: {id: dataReplies[i].ownerId}})
        .then(userdata => {
            if(userdata) {
                dataReplies[i].ownerName = userdata.username;
                if(i == dataReplies.length-1)return res.status(201).send({repliesList: dataReplies});
                else return getOwnerInfos(replyCheck++);
            } else { throw 'L\'utilisateur ID ' + data[i].ownerId + ' lié à la réponse n°' + data[i].id + ' est introuvable.'; }
        });
    }
    getAllReplies(); // Process execution
}

exports.createReply = (req, res, next) => {
    const newReply = { ownerId: getUserIdFromRequest(req), postId: req.params.id, txt: req.body.txt }
    Reply.create(newReply)
        .then(data => {
            if(data) res.status(201).send({myReply: data, message : 'Votre réponse a été envoyée avec succès.'});
            else throw 'Aucune réponse semble n\'avoir été envoyée'
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

exports.editReply = (req, res, next) => {
    const replyId = req.params.id; const isUpdated = 1; let isAdmin = false;
    Reply.findOne({ where: {id: replyId} })
        .then(replyData => {
            Users.findOne({ where: {id: getUserIdFromRequest(req)} })
                .then(userData => { // Check user permissions
                    if(userData.isAdmin == 1) { isAdmin = true; } else { isAdmin = false; }
                    if(isAdmin || replyData.ownerId == userData.id) { // User is admin or owner of this reply
                        Reply.update({txt: req.body.txt}, { where: { id: replyId } })
                            .then(result => { // Update this reply
                                if(result == isUpdated) { res.status(204).send(); }
                                else { throw 'Ce commentaire n\'a pas été correctement modifié.' }
                            })
                            .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
                    } else return res.status(403).send({message: "Vous n'avez pas la permission pour modifier ce commentaire."})
                })
                .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}

exports.deleteReply = (req, res, next) => {
    const replyId = req.params.id; const isDeleted = 1; let isAdmin = false;
    Reply.findOne({ where: {id: replyId} })
        .then(replyData => {
            Users.findOne({ where: {id: getUserIdFromRequest(req)} })
                .then(userData => { // Check user permissions
                    if(userData.isAdmin == 1) { isAdmin = true; } else { isAdmin = false; }
                    if(isAdmin || replyData.ownerId == userData.id) { // User is admin or owner of this reply
                        Reply.destroy({ where: { id: replyId }, force: true })
                            .then(result => { // Destroy this reply
                                if(result == isDeleted) { res.status(204).send(); }
                                else { throw 'Ce commentaire n\'a pas pu être correctement supprimé.' }
                            })
                            .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
                    } else return res.status(403).send({message: "Vous n'avez pas la permission pour supprimer ce commentaire."})
                })
                .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}