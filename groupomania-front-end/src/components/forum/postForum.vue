<template>
    <div class="post-content" v-if="!isDeleted">
        <div class="post-profil-img">
            <img :src="dataPost.ownerAvatar" :class="{'no-avatar' : dataPost.ownerAvatar == './default-avatar.png' }" alt="Image de profil">
        </div>
        <div class="post-infos">
            <span class="post-owner">Posté le <b>{{ postDate }}</b> à <b>{{ postTime }}</b><br />par <b>{{ dataPost.ownerName }}</b></span>
            <div class="post-manage comments-nb" @click="manageReplies(0)" v-if="!inEdit">
                <img src="@/assets/icons/comments-icon.png" alt="Commentaires liés à ce post">
                <span>{{ nbReplies }}</span>
            </div>
            <div class="post-manage" @click="editPost()" v-if="userData.isAdmin || dataPost.ownerId == userData.id">
                <img src="@/assets/icons/edit-icon.png" alt="Editer ce post">
                <span v-if="inEdit">Valider</span>
            </div>
            <div class="post-manage" @click="deletePost()" v-if="userData.isAdmin && !inEdit || dataPost.ownerId == userData.id && !inEdit">
                <img src="@/assets/icons/delete-icon.png" alt="Supprimer ce post">
            </div>
        </div>
        <div class="parag-post">
            <textarea class="textarea-edit" spellcheck="false" v-model="editText" v-if="inEdit"></textarea>
            {{ postText }}
            <img :src="dataPost.fileImg" class="image-post" v-if="dataPost.fileImg" alt="Image jointe au post">
        </div>
        <commentsList :targetPost="dataPost" @repliesState="manageReplies" :showReplies="showReplies" :userData="userData" :userToken="userToken" />
    </div>
</template>

<script>
import commentsList from '@/components/forum/commentsList.vue'

import funcs from '@/modules/functions.js'
import store from '@/modules/store.json'

export default {
    name: 'postForum',
    components: {
        commentsList
    },
    props: ['userData', 'userToken', 'dataPost'],
    data() {
        return {
            postDate: funcs.newDateFormat(this.dataPost.createdAt),
            postTime: funcs.newTimeFormat(this.dataPost.createdAt),
            postText: this.dataPost.txt,
            editText: this.dataPost.txt, inEdit: false,
            isDeleted: false,
            nbReplies: this.dataPost.nbReplies, showReplies: false,
        }
    },
    methods: {
        manageReplies: function(update, newRepliesNb) {
            if(update) { this.nbReplies = newRepliesNb; 
            } else {
                if(this.nbReplies) {
                    if(!this.showReplies) { this.showReplies = true;
                    } else { this.showReplies = false; }
                }
            }
        },
        editPost() {
            if(this.inEdit) { 
                this.inEdit = false;
                const data = { txt: this.editText }
                fetch(store.host_api + '/post/' + this.dataPost.id, { 
                        method: 'PUT',
                        headers: { 'Content-type' : 'application/json', 'Authorization' : 'Bearer ' + this.userToken },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if(response.status == 204) { this.postText = this.editText; }
                        else { throw 'Le post n\'a pas pu être modifié.' }
                    });
            } else { this.inEdit = true }
        },
        deletePost() {
            fetch(store.host_api + '/post/' + this.dataPost.id, { method: 'DELETE', headers: { 'Content-type' : 'application/json', 'Authorization' : 'Bearer ' + this.userToken } })
                .then(response => {
                    if(response.status == 204) { this.isDeleted = true; }
                    else { throw 'La suppression du post n\'a pas pu être effective.' }
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_media.scss';

.post-content {
    position: relative;
    margin-top: 65px;
    width: 100%; min-height: 90px;
    border: 2px solid transparent;
    border-top: 12px solid #e2e2e2;
}

.post-content .post-profil-img {
    position: absolute;
    top: -35px; left: 45px;
    width: 90px; height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-left: 30px solid white;
    border-right: 30px solid white;
    z-index: 1;
    @include ultrasmall { left: -5px; }
}

.post-content .post-profil-img img {
    position: relative;
    width: 100%; height: 100%;
    border: 2px solid #cecece;
    border-radius: 10px;
}

.post-content .post-profil-img .no-avatar { 
    border: none;
    bottom: 15px;
}

.post-content .post-infos {
    position: absolute;
    right: 0px;
    width: 72%;
    height: 55px;
    text-align: left;
    align-items: center;
    @include mobile {
        width: 195px; height: 90px;
        text-align: right;
    }
}

.post-content .post-infos .post-owner {
    position: relative;
    font-size: 14px;
    float: left;
    top: 10px;
    @include tablet {
        left: 46px;
    }
    @include mobile {
        float: right;
        top: 12px; 
        left: inherit; right: 12px;
        font-size: 13px;
    }
}

.post-content .post-infos .post-manage {
    position: relative;
    float: right;
    top: 10px;
    height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @include mobile {
        top: 15px;
    }
}

.post-content .post-infos .comments-nb {
    width: 70px;
    padding-left: 0px;
    top: 12px;
    @include mobile { top: 17px; }
}

.post-content .post-infos .comments-nb span {
    margin-top: 0px!important;
}

.post-content .post-infos .comments-nb img {
    margin-left: 15px!important;
}

.post-content .post-infos .post-manage:hover {
    background-color: #f7f7f7;
    border-radius: 45px;
}

.post-content .post-infos .post-manage img {
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
    @include mobile {
        width: 15px;
    }
}

.post-content .post-infos .post-manage span {
    margin-top: 3px;
    font-size: 13px;
    font-weight: bold;
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 2px;
    color: #9577d4;
}

.post-content .parag-post {
    position: relative;
    margin-top: 90px;
    left: 5%; width: 90%;
    padding-bottom: 25px;
    text-align: justify;
    white-space: pre-line;
    @include mobile {
        margin-top: 110px;
    }
}

.post-content .parag-post .textarea-edit {
    position: absolute;
    top: 0px; left: 0px;
    width: 100%; height: 100%;
    outline: 0; border: none;
    font-family: Nunito;
    font-weight: bold;
    resize: none;
}

.post-content .parag-post .image-post {
    position: relative;
    margin-top: 30px;
    width: 100%;
    border-radius: 18px;
    opacity: 0.5;
    transition-duration: 0.5s;
}

.post-content .parag-post .image-post:hover {
    opacity: 1;
}
</style>