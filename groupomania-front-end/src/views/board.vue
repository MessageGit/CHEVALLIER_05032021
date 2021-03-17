<template>
  <div class="board">
    <div class="header-toolbar">
      <span>Vous êtes connecté à groupomania en tant que <b>MessageBox</b></span>
    </div>
    <div class="board-content">

      <!-- Left content -->
      <div class="tool-profil">
        <img src="../assets/icons/user2-icon.png" id="profil-img" alt="Image de profil">
        <div id="user-name">MessageBox</div>
        <ul class="tool-menu">
          <li class="menu-list" @click="menuFocus = 1" :class="{'focus-menu' : menuFocus == 1}">Accueil</li>
          <li class="menu-list" @click="menuFocus = 2" :class="{'focus-menu' : menuFocus == 2}">Paramètres</li>
          <li class="menu-list" @click="logout()" :class="{'focus-menu' : menuFocus == 3}">Déconnexion</li>
        </ul>
      </div>

      <div class="forum-content" v-if="menuFocus != 2">
        <!-- Insertion content -->
        <div class="insert-post">
          <textarea placeholder="Ecrivez quelque chose ici.."></textarea>
          <div class="join-img">
            <input type="file" id="post-join-img" name="profil-img">
            <label for="post-join-img"></label>
            <span>Ajouter une image</span>
            <img src="../assets/icons/upload-img-icon.png" alt="Joindre une image à votre post">
          </div>
          <div class="submit-button">Envoyer</div>
        </div>

        <!-- Forum content -->
        <postForum />
      </div>

      <div class="profil-content" v-else>
        <div class="change-img">
          <form class="upload-img">
            <input type="file" id="profil-upload" name="profil-img">
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
            <div class="acc-delete-btn">Supprimer mon compte</div>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import postForum from '@/components/postForum.vue'

export default {
  name: 'Board',
  components: {
    postForum
  },
  data() {
    return {
      menuFocus: 1
    }
  },
  methods: {
    logout() {
      this.menuFocus = 3;
      localStorage.removeItem('TokenJWT');
      setTimeout(() => { 
        window.location.reload(); 
      }, 250);
    }
  }
}
</script>

<style scoped>
.board {
  width: 100%;
}

.board .header-toolbar {
  position: fixed;
  top: 0px;
  width: 100%; height: 38px;
  background-color: #9577d4;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 5px 0px rgb(0 0 0 / 17%);
  -webkit-box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.17);
  -moz-box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.17);
  z-index: 9;
}

.board .header-toolbar span {
  color: white;
  font-size: 14px;
}

.board .board-content {
  position: relative;
  margin: 0 auto;
  width: 1000px;
}

.board .board-content .forum-content {
  position: relative;
  float: right; margin-top: 80px;
  width: 70%; min-height: 900px;
}

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

.board .board-content .profil-content {
  position: relative;
  margin-top: 80px;
  float: right;
  width: 70%;
  min-height: 300px;
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

.board .board-content .tool-profil {
  position: fixed;
  top: 75px;
  float: left;
  width: 215px;
  height: 300px;
}

.board .board-content .tool-profil #profil-img {
  width: 110px; height: 110px;
  border-radius: 45px;
}

.board .board-content .tool-profil #user-name {
  margin-top: 15px;
  width: 100%;
}

.board .board-content .tool-profil .tool-menu {
  position: relative;
  margin-top: 25px;
  width: 100%;
  padding: 0;
}

.board .board-content .tool-profil .tool-menu .menu-list {
  position: relative;
  width: 90%; height: 32px;
  padding-left: 10%;
  font-size: 14px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  margin-top: 8px;
  border-radius: 3px;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  transition-duration: 0.2s;
}

.board .board-content .tool-profil .tool-menu .menu-list:hover { opacity: 0.7; }

.board .board-content .tool-profil .tool-menu .focus-menu {
  background-color: #9577d4; 
  color: white;
}
</style>