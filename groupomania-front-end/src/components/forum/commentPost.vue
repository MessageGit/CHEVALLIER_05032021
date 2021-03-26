<template>
    <div class="comment-ctn" v-if="!isDeleted">
        <img src="@/assets/icons/reply-icon.png" class="reply-icon" alt="Réponse de MessageBox">
        <div class="comment-txt">
            <textarea class="edit-reply" spellcheck="false" v-if="inEdit" v-model="editReply"></textarea>
            {{ replyTxt }}
        </div>
        <div class="comment-infos">
            Le <b>{{ replyDate }}</b> à <b>{{ replyTime }}</b> par <b>{{ dataReply.ownerName }}</b>
        </div>
        <div class="comment-manage" v-if="dataReply.ownerId == userData.id || userData.isAdmin">
            <div class="manage-icon" @click="replyEdition()">
                <img src="@/assets/icons/edit-icon.png" alt="Editer cette réponse">
                <span v-if="inEdit">Valider</span>
            </div>
            <div class="manage-icon" @click="replyDelete()" v-if="!inEdit">
                <img src="@/assets/icons/delete-icon.png" alt="Supprimer cette réponse">
            </div>
        </div>
    </div>
</template>

<script>
import funcs from '@/modules/functions.js'

import store from '@/modules/store.json'

export default {
    el: 'commentPost',
    props: ['userData', 'userToken', 'dataReply'],
    data() {
        return {
            replyTxt: this.dataReply.txt,
            replyDate: funcs.newDateFormat(this.dataReply.createdAt),
            replyTime: funcs.newTimeFormat(this.dataReply.createdAt),
            editReply: this.dataReply.txt, inEdit: false,
            isDeleted: false
        }
    },
    methods: {
        replyEdition() {
            if(!this.inEdit) { this.inEdit = true;
            } else { this.inEdit = false;
                fetch(store.host_api + '/reply/' + this.dataReply.id, { 
                    method: 'PUT', 
                    headers: { 'Content-type' : 'application/json', 'Authorization' : 'Bearer ' + this.userToken },
                    body: JSON.stringify({txt: this.editReply})
                })
                .then(response => {
                    if(response.status == 204) { this.replyTxt = this.editReply; }
                    else { throw 'Ce commentaire n\'a pas pu être modifié.' }
                });
            }
        },
        replyDelete() {
            fetch(store.host_api + '/reply/' + this.dataReply.id, { method: 'DELETE', headers: { 'Content-type' : 'application/json', 'Authorization' : 'Bearer ' + this.userToken } })
                .then(response => {
                    if(response.status == 204) { 
                        this.isDeleted = true; 
                        this.$emit('replyDeleted');
                    }
                    else { throw 'Ce commentaire n\'a pas pu être supprimé.' }
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_media.scss';

.comment-ctn {
    position: relative;
    width: 100%; min-height: 45px;
    margin-bottom: 25px;
    padding: 25px 0px 55px 0px;
    background-color: #f7f7f7;
    border-radius: 3px;
    @include ultrasmall {
        padding-bottom: 70px;
    }
}

.comment-ctn .reply-icon {
    position: absolute;
    left: 5%;
    width: 35px;
    opacity: 0.4;
    @include ultrasmall {
        left: 14px; top: 20px;
        width: 20px;
    }
}

.comment-ctn .comment-txt {
    position: relative;
    top: 34px;
    left: 17.5%;
    width: 75%;
    font-size: 13px;
    text-align: justify;
    white-space: pre-line;
    @include ultrasmall {
        top: 62px;
    }
}

.comment-ctn .comment-txt .edit-reply {
    position: absolute;
    top: 0px; left: 0px;
    width: 100%; height: 100%;
    resize: none;
    outline: 0; border: none;
}

.comment-ctn .comment-infos {
    position: absolute;
    left: 17.5%; top: 20px;
    background-color: #735f9a;
    color: white;
    padding: 4px 10px 4px 10px;
    border-radius: 3px;
    font-size: 12px;
}

.comment-ctn .comment-manage {
    position: absolute;
    top: 18px; right: 35px;
    @include ultrasmall {
        top: 52px; right: 10px;
    }
}

.comment-ctn .comment-manage .manage-icon {
    position: relative;
    padding: 6px 10px 6px 10px;
    float: right;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    cursor: pointer;
    border-radius: 45px;
    @include ultrasmall {
        margin-right: 2px;
    }
    @include mobile {
        margin-right: 2px;
        padding: 6px;
    }
}

.comment-ctn .comment-manage .manage-icon:hover {
    background-color: #ececec;
}

.comment-ctn .comment-manage .manage-icon span {
    position: relative;
    top: 2px;
    margin-left: 10px;
    font-size: 13px;
}

.comment-ctn .comment-manage .manage-icon img {
    width: 20px; height: 20px;
    @include ultrasmall {
        width: 15px; height: 15px;
    }
    @include mobile {
        width: 15px; height: 15px;
    }
}
</style>