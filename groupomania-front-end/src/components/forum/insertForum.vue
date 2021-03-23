<template>
    <div class="insert-post">
        <textarea placeholder="Ecrivez quelque chose ici.."></textarea>
        <div class="join-img">
            <input type="file" id="post-join-img" name="profil-img">
            <label for="post-join-img"></label>
            <span>Ajouter une image</span>
            <img src="@/assets/icons/upload-img-icon.png" alt="Joindre une image à votre post">
        </div>
        <div class="submit-button" @click="newPost()">Envoyer</div>
    </div>
</template>

<script>
import store from '@/modules/store.json'

export default {
    el: 'insertForum',
    props: ['userToken', 'userData', 'liveAvatar'],
    methods: {
        newPost() {
            var data = new FormData();
            const postTxt = document.getElementsByTagName('textarea')[0];
            const postImg = document.getElementById('post-join-img');
            data.append('img', postImg.files[0]); data.append('txt', postTxt.value);
            fetch(store.host_api + '/post', { method: 'POST', headers: { 'Authorization' : 'Bearer ' + this.userToken }, body: data })
            .then(response => response.json())
            .then(data => {
                postTxt.value = ''; postImg.value = '';
                data.data.ownerName = this.userData.username;
                data.data.ownerAvatar = this.liveAvatar;
                data.data.nbReplies = 0;
                this.$emit('newPost', data.data);
            })
            .catch((err) => { console.log(err) });
        }
    }
}
</script>

<style scoped>
.board .board-content .forum-content .insert-post {
  position: relative;
  width: 100%;
  padding-bottom: 40px;
}

.board .board-content .forum-content .insert-post textarea {
  position: relative;
  min-width: 94%; max-width: 94%; 
  min-height: 45px; max-height: 110px;
  border: 2px solid #ececec;
  border-radius: 10px;
  outline: 0;
  padding: 15px 2.5% 0px 2.5%;
  font-family: Nunito;
  font-weight: bold;
}

.board .board-content .forum-content .insert-post .join-img {
  position: absolute;
  right: 180px; bottom: 0px;
  width: 200px; height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  transition-duration: 0.2s;
}

.board .board-content .forum-content .insert-post .join-img:hover {
  opacity: 0.7;
  background-color: #ececec;
}

.board .board-content .forum-content .insert-post .join-img #post-join-img {
  display: none;
}

.board .board-content .forum-content .insert-post .join-img label {
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  cursor: pointer;
  z-index: 1;
}

.board .board-content .forum-content .insert-post .join-img span {
  position: relative;
  font-weight: bold;
  color: #14b76c;
  font-size: 14px;
  margin-right: 15px;
}

.board .board-content .forum-content .insert-post .join-img img {
  height: 20px;
  width: 24px;
}

.board .board-content .forum-content .insert-post .submit-button {
  position: absolute;
  right: 0px; bottom: 0px;
  width: 165px; height: 34px;
  color: white;
  background-color: #9577d4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition-duration: 0.2s;
}

.board .board-content .forum-content .insert-post .submit-button:hover {
  opacity: 0.7;
}
</style>