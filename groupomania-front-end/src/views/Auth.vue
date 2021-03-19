<template>
  <div class="auth-page" v-if="!userData">
    <div class="intro-content">
      <h1>Plus de collaborateurs, plus de discussions..</h1>
      <div class="acc-case" @click="authType = 0" :class="{ 'focus-acc' : !authType }">
        <span class="plus-icon"></span>
        <span>Vous n'avez pas de compte ?<br /><b>Rejoignez-nous dès-maintenant.</b></span>
      </div>
      <div class="acc-case" @click="authType = 1" :class="{ 'focus-acc' : authType }">
        <img src="../assets/icons/user-icon.png" id="acc-icon" alt="Connectez-vous">
        <span>Vous avez déjà un compte ?<br /><b>Connectez-vous.</b></span>
      </div><br /><br />
      <div class="subtitle">Apprenez en plus de vos collègues avec Groupomania, discutez de tout et de rien, l'essentiel, ne pas se perdre de vue !</div>
      <img alt="Groupomania logo" id="auth-vector" src="../assets/img/auth-vector.png">
    </div>
    <div class="auth-content">
      <img alt="Groupomania logo" id="website-icon" src="../assets/icons/web-icon-black.png">
      <signupModal @isValid="sessionAlias" v-if="!authType" />
      <loginModal :alias="aliasLogin" v-else />
      <div class="social-link">
        <img src="../assets/icons/social/facebook-icon.png" alt="Facebook">
        <img src="../assets/icons/social/twitter-icon.png" alt="Twitter">
        <img src="../assets/icons/social/discord-icon.png" alt="Discord">
      </div>
    </div>
  </div>
</template>

<script>
import signupModal from '@/components/signupModal.vue'
import loginModal from '@/components/loginModal.vue'

export default {
  name: 'Auth',
  components: {
    signupModal,
    loginModal
  },
  props: ['userData'],
  beforeCreate() {
    if(this.userData)return this.$router.push('/board')
  },
  data() {
    return {
      authType: 1, // Login (default)
      aliasLogin: ''
    }
  },
  methods: {
    sessionAlias(email) {
      this.authType = 1;
      this.aliasLogin = email
    }
  }
}
</script>

<style scoped>
.auth-page {
  position: fixed;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background: url('../assets/img/background.jpg') no-repeat 100%;
  background-size: 100% 100%;
}

.auth-page::after {
  content: '';
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background-color: #000000cc;
}

.auth-page .intro-content {
  position: absolute;
  right: 550px; top: 0px;
  height: 100%;
  text-align: right;
  font-size: 18px;
  color: white;
  z-index: 1;
}

.auth-page .intro-content h1 {
  margin-top: 35px;
  margin-right: 15px;
}

.auth-page .intro-content .subtitle {
  position: relative;
  float: right;
  top: 35px; right: 15px;
  width: 70%;
  font-weight: 100;
  font-size: 18px;
}

.auth-page .intro-content .acc-case {
  position: relative;
  top: 5px; margin-right: 15px;
  float: right; min-width: 250px;
  padding: 15px; border-radius: 5px;
  color: white; font-size: 14px;
  align-items: center; text-align: left;
  background-color: #ffffff1c;
  border: 2px solid #d2d2d2;
  cursor: pointer;
  display: flex;
  transition-duration: 0.2s;
}

.focus-acc { background-color: #ffffff4c!important; }

.auth-page .intro-content .acc-case:hover { background-color: #ffffff3c; }

.auth-page .intro-content .acc-case #acc-icon {
  position: absolute;
  width: 35px;
  right: 25px;
}

.auth-page .intro-content .acc-case .plus-icon {
  position: absolute;
  right: 25px;
  width: 20px; height: 3px;
  background-color: white;
}

.auth-page .intro-content .acc-case .plus-icon::after {
  content: '';
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  transform: rotate(90deg);
  background-color: white;
}

.auth-page .intro-content #auth-vector {
  position: absolute;
  bottom: 0px; right: 90px;
  width: 250px; height: 230px;
  opacity: 0.8;
}

.auth-content {
  position: absolute;
  right: 0px; top: 0px;
  width: 520px; height: 100%;
  background-color: white;
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.35);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-content #website-icon {
    position: absolute;
    top: 45px;
    width: 215px;
}

.auth-content .auth-form {
  position: relative;
  width: 80%;
}

.auth-content .social-link {
  position: absolute;
  bottom: 20px; right: 25px;
}

.auth-content .social-link img {
  filter: invert(1);
  width: 34px;
  margin-right: 12px;
  transition-duration: 0.2s;
  cursor: pointer;
}

.auth-content .social-link img:hover {
  transform: scale(1.1);
  opacity: 0.7;
}
</style>