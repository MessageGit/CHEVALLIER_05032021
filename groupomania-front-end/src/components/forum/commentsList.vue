<template>
    <div class="comments-content">
        <div class="list-comments">
            <commentPost v-show="showReplies" v-for="reply in allReplies" :key="reply.id" :dataReply="reply" :userData="userData" :userToken="userToken" @replyDeleted="replyDeleted" />
            <div class="empty-replies" v-if="!nbReplies">
                Aucun commentaire pour le moment
            </div>
            <div class="show-replies" v-else @click="$emit('repliesState', 0)">
                <img src="@/assets/icons/comments-icon.png" class="arrow-icon" alt="Voir les commentaires liés à ce post">
                <span>{{ displayLabel() }}</span>
            </div>
        </div>
        <div class="insert-reply">
            <textarea id="reply-postarea" spellcheck="false" v-model="txtReply" placeholder="Réagissez à ce post.."></textarea>
            <button id="reply-submit" @click="sendReply">
                <img src="@/assets/icons/arrow-icon.png" alt="Envoyer ma réponse">
            </button>
        </div>
    </div>
</template>

<script>
import commentPost from '@/components/forum/commentPost.vue'

import store from '@/modules/store.json'

export default {
    el: 'commentsList',
    components: {
        commentPost
    },
    props: ['userData', 'userToken', 'showReplies', 'targetPost'],
    watch: {
        showReplies: function(newData) {
            if(newData == true) {
                if(document.documentElement.scrollTop != 0) {
                    this.scrollY = document.documentElement.scrollTop;
                } else { this.scrollY = document.body.scrollTop; }
                if(!this.allReplies) { this.getAllReplies() }
            } else { 
                if(document.documentElement.scrollTop != 0) {
                    document.documentElement.scrollTop = this.scrollY 
                } else { document.body.scrollTop = this.scrollY }
            }
        }
    },
    data() {
        return {
            txtReply: '',
            nbReplies: this.targetPost.nbReplies,
            allReplies: '',
            scrollY: 0,
        }
    },
    methods: {
        displayLabel() {
            if(!this.showReplies) {
                if(this.nbReplies > 1) { return 'Voir les ' + this.nbReplies + ' commentaires liés à ce post';
                } else { return 'Voir le commentaire lié à ce post'; }
            } else {
                if(this.nbReplies > 1) { return 'Cacher les ' + this.nbReplies + ' commentaires liés à ce post';
                } else {return 'Cacher le commentaire lié à ce post'; }
            }
        },
        getAllReplies() {
            fetch(store.host_api + '/reply/' + this.targetPost.id, { method: 'GET', headers: { 'Content-type' : 'application/json' } })
            .then(response => {
                if(response.status == 201) { return response.json()
                } else { throw 'Impossible de récupérer les commentaire de ce post.' }
            })
            .then(data => { 
                this.allReplies = data.repliesList;
                console.log(data) 
            })
            .catch((err) => { console.log(err) });
        },
        sendReply() {
            fetch(store.host_api + '/reply/' + this.targetPost.id, { 
                method: 'POST', 
                headers: { 'Content-type' : 'application/json', 'Authorization' : 'Bearer ' + this.userToken }, 
                body: JSON.stringify({txt: this.txtReply}) 
            })
            .then(response => {
                if(response.status == 201) { return response.json()
                } else { throw 'Votre réponse semble ne pas avoir été envoyée.' }
            })
            .then(data => { 
                this.txtReply = ''; this.replyAdded();
                if(this.allReplies) {
                    data.myReply.ownerName = this.userData.username;
                    this.allReplies.push(data.myReply);
                }
                console.log(data.message)
            })
            .catch((err) => { console.log(err) });
        },
        replyDeleted() {
            this.nbReplies --; // Update replies count
            this.$emit('repliesState', 1, this.nbReplies)
        },
        replyAdded() {
            this.nbReplies ++; // Update replies count
            this.$emit('repliesState', 1, this.nbReplies)
        }
    }
}
</script>

<style scoped>
.comments-content {
    position: relative;
    width: 90%;
    margin: 0 auto;
}

.comments-content .list-comments {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
}

.comments-content .list-comments .empty-replies {
    position: relative;
    width: 100%;
    padding: 20px 0px 35px 0px;
    font-weight: bold;
    color: #c1c1c1;
}

.comments-content .list-comments .show-replies {
    position: relative;
    font-weight: bold;
    color: #9577d4;
    width: fit-content;
    margin: 0px auto 30px auto;
    padding: 10px 30px 10px 55px;
    background-color: #f9f6ff;
    font-size: 13px;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 0.2s;
}

.comments-content .list-comments .show-replies .arrow-icon {
    position: absolute;
    left: 22px; top: 11px;
    width: 16px; height: 16px;
}

.comments-content .list-comments .show-replies:hover {
    transform: scale(1.1);
    opacity: 0.4;
    border-radius: 45px;
}

.comments-content .insert-reply {
    position: relative;
    width: 100%;
}

.comments-content .insert-reply #reply-postarea {
    position: relative;
    width: 85%; height: 38px;
    resize: none;
    outline: 0; border: 2px solid #ececec;
    font-family: Nunito;
    padding: 15px 10% 15px 5%;
    border-radius: 90px;
}

.comments-content .insert-reply #reply-submit {
    position: absolute;
    right: 8px; bottom: 20px;
    width: 45px; height: 45px;
    border: none; outline: 0;
    background-color: #9577d4;
    border-radius: 90px;
    cursor: pointer;
    transition-duration: 0.2s;
}

.comments-content .insert-reply #reply-submit:hover {
    background-color: #333;
    transform: scale(1.5)
}

.comments-content .insert-reply #reply-submit img {
    position: relative;
    width: 30px; height: 30px;
    transform: rotate(270deg);
    filter: invert(1);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>