<template>
    <div class="profil-content">
        <div class="change-img">
          <form class="upload-img">
            <input type="file" @change="updateImgProfil" id="profil-upload" name="profil-img">
            <label for="profil-upload"></label>
          </form>
          <div class="change-txt">
            <b>Changez votre photo de profil</b> en renseignant l'URL d'une nouvelle image ou en recherchant directement
            une image sur votre appareil, celle-ci deviendra visible dans vos nouveaux posts.
          </div>
        </div>
        <div class="delete-account">
          <span>
            Conformément aux législations en vigueur, vous avez le droit de supprimer votre profil ainsi
            que le contenu créé/partagé sur notre plateforme, sachez que vous allez simplement nous manquer :(
            <br /><br />
            <b>Que souhaitez-vous faire ?</b>
            <div class="acc-delete-btn" @click="deleteAcc()">Supprimer mon compte</div>
          </span>
        </div>
      </div>
</template>

<script>
import store from '../modules/store.json'

export default {
    el: 'userProfile',
    props: ['userData', 'userToken'],
    methods: {
        updateImgProfil(event) { 
            var data = new FormData()
            data.append('img', event.target.files[0]);
            fetch(store.host_api + '/auth/user', { 
              method: 'PUT', 
              headers: { 'Authorization': 'Bearer ' + this.userToken }, 
              body: data 
            })
            .then(response => {
                if(response.status == 201) { return response.json()
                } else { throw 'Votre photo de profil n\'a pas pu être modifiée.' }
            })
            .then(data => { this.$emit('avatarUpdate', data.imgLink); })
            .catch((err) => { console.log(err); });
        },
        deleteAcc() {
            fetch(store.host_api + '/auth/user', {
                method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.userToken }
            })
            .then(response => {
                if(response.status == 204) { this.$emit('forceLogout');
                } else { throw 'La suppression de votre compte a échoué.' }
            })
            .catch((err) => { console.log(err) });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_media.scss';

.board .board-content .profil-content {
  position: relative;
  margin-top: 80px;
  float: right;
  width: 70%;
  min-height: 300px;
  @include smalllaptop {
    margin: 80px auto 80px auto;
    float: inherit;
    width: 80%;
  }
  @include mobile { width: 90%; }
}

.board .board-content .profil-content .change-img {
  position: relative;
  margin-top: 25px;
  width: 100%;
  text-align: justify;
}

.board .board-content .profil-content .upload-img {
  position: relative;
  width: 30%; height: 90px;
  margin-right: 5%;
  display: inline-block;
}

.board .board-content .profil-content .upload-img #profil-upload { display: none; }
.board .board-content .profil-content .upload-img label {
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background: url('../assets/icons/upload-icon.png') no-repeat center;
  background-size: 36% 60%;
  cursor: pointer;
  border: 2px dotted #ececec;
  border-radius: 5px;
  transition-duration: 0.2s;
  @include mobile {
    background-size: 56% 70%;
  }
}

.board .board-content .profil-content .upload-img label:hover {
  opacity: 0.7;
  transform: scale(1.1);
  background-color: #ececec;
}

.board .board-content .profil-content .change-txt {
  position: absolute;
  width: 60%;
  display: inline-block;
  @include tablet {
    font-size: 14px;
  }
}

.board .board-content .profil-content .delete-account {
  position: relative;
  margin-top: 45px;
  width: 95%; min-height: 120px;
  border-radius: 5px;
  background-color: #ececec;
  text-align: left;
  padding: 20px 2.5% 25px 2.5%;
}

.board .board-content .profil-content .delete-account span {
  font-size: 15px;
}

.board .board-content .profil-content .delete-account .acc-delete-btn {
  position: relative;
  background-color: #a56363;
  width: 170px; height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white; font-size: 13px;
  border-radius: 5px;
  margin-top: 8px;
  cursor: pointer;
  transition-duration: 0.2s;
}

.board .board-content .profil-content .delete-account .acc-delete-btn:hover {
  opacity: 0.7;
  width: 200px;
}
</style>