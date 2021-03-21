<template>
  <div class="board" v-if="userData">
    <div class="header-toolbar">
      <span>Vous êtes connecté à groupomania en tant que <b>{{ userData.username }}</b></span>
    </div>
    <div class="board-content">

      <!-- Left content -->
      <div class="tool-profil">
        <img :src="displayAvatar" id="profil-img" alt="Image de profil">
        <div id="user-name">{{ userData.username }}</div>
        <ul class="tool-menu">
          <li class="menu-list" @click="menuFocus = 1" :class="{'focus-menu' : menuFocus == 1}">Accueil</li>
          <li class="menu-list" @click="menuFocus = 2" :class="{'focus-menu' : menuFocus == 2}">Paramètres</li>
          <li class="menu-list" @click="logout()" :class="{'focus-menu' : menuFocus == 3}">Déconnexion</li>
        </ul>
      </div>

      <div class="forum-content" v-if="menuFocus != 2">
        <insertForum @newPost="postCreated" :liveAvatar="displayAvatar" :userData="userData" :userToken="userToken" />
        <postsList :newPost="newPostData" :userData="userData" :userToken="userToken" />
      </div>

      <userProfile @avatarUpdate="imgProfilUpdated" @forceLogout="logout" :userData="userData" :userToken="userToken" v-else />

    </div>
  </div>
</template>

<script>
// User profil
import userProfile from '@/components/userProfile.vue'

// Forum content
import insertForum from '@/components/forum/insertForum.vue'
import postsList from '@/components/forum/postsList.vue'

export default {
  name: 'Board',
  components: {
    insertForum,
    postsList,
    userProfile
  },
  beforeCreate() {
    if(!this.userData)return this.$router.push('/')
  },
  props: ['userData', 'userToken'],
  data() {
    return {
      menuFocus: 1,
      displayAvatar: this.userData.imgProfil,
      newPostData: ''
    }
  },
  methods: {
    logout() {
      this.menuFocus = 3;
      localStorage.removeItem('TokenJWT');
      setTimeout(() => { 
        window.location.reload(); 
      }, 250);
    },
    imgProfilUpdated(newImg) { this.displayAvatar = newImg; },
    postCreated(data) {
      this.newPostData = data;
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

.board .board-content .tool-profil {
  position: fixed;
  top: 75px;
  float: left;
  width: 215px;
  height: 300px;
}

.board .board-content .tool-profil #profil-img {
  width: 110px; height: 110px;
  border-radius: 90px;
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

<!-- Updated (21/03/2021) -->