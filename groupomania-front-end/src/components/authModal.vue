<template>
  <div class="auth-content">
    <img alt="Groupomania logo" id="website-icon" src="../assets/icons/web-icon-black.png">
    <div class="auth-form" v-if="authType"><!-- Connexion -->
      Connexion
    </div>
    <div class="auth-form" v-if="!authType"><!-- Inscription -->
      <div class="input-block">
        <input type="text" name="username" class="input-form" v-model="signData.username" id="sign-username"/>
        <label for="sign-username" :class="{ 'focus-label' : signData.username }">Nom d'utilisateur</label>
      </div>
      <div class="input-block">
        <input type="text" name="email" class="input-form" v-model="signData.email" id="sign-email"/>
        <label for="sign-email" :class="{ 'focus-label' : signData.email }">Adresse e-mail</label>
      </div>
      <div class="input-block">
        <input type="password" name="passwrd" class="input-form" v-model="signData.passwrd" id="sign-passwrd" />
        <label for="sign-passwrd" :class="{ 'focus-label' : signData.passwrd }">Mot de passe</label>
      </div>
      <div class="input-block">
        <input type="password" name="passwrd-rpt" class="input-form" v-model="signData.passwrdrpt" id="sign-passwrdrpt" />
        <label for="sign-passwrdrpt" :class="{ 'focus-label' : signData.passwrdrpt }">Mot de passe (répêtez-le)</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authModal',
  data() {
    return {
      authType: 0,
      signData: { username: '', email: '', passwrd: '', passwrdrpt: '' }
    }
  }
}
</script>

<style scoped lang="scss">
.auth-content {
  position: absolute;
  right: 0px; top: 0px;
  width: 520px; height: 100%;
  background-color: white;
  box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.auth-content #website-icon {
    position: absolute;
    top: 35px;
    right: 45px;
    width: 215px;
}

.auth-content .auth-form {
  position: relative;
  margin: 0 auto;
  margin-top: 180px;
  width: 80%;
  height: 30px;
}

.auth-content .auth-form .input-block {
  position: relative;
  margin: 0 auto;
  width: 80%;
  text-align: left;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.auth-content .auth-form .input-block::before {
  content: '';
  position: absolute;
  bottom: 0px; left: 0px;
  width: 100%; height: 2px;
  background-color: #ececec;
}

.auth-content .auth-form .input-block::after {
  content: '';
  position: absolute;
  bottom: 0px; left: 0px;
  width: 0%; height: 2px;
  background-color: #333;
  transition-duration: 0.2s;
}

.auth-content .auth-form .input-block:hover::after {
  width: 100%;
}

.auth-content .auth-form .input-block .input-form {
  position: relative;
  border: none;
  outline: 0;
  background-color: transparent;
  padding: 15px;
  font-size: 15px;
  padding-left: 15px;
  width: 100%;
  transition-duration: 0.2s;
}

.auth-content .auth-form .input-block .input-form:focus {
  background-color: #ececec;
}

.auth-content .auth-form .input-block label {
  position: absolute;
  left: 15px;
  cursor: text;
  pointer-events: none;
  transition-duration: 0.2s;
}

.auth-content .auth-form .input-block .focus-label {
  position: absolute;
  margin-bottom: 48px;
  font-weight: bold;
  font-size: 14px;
}
</style>
