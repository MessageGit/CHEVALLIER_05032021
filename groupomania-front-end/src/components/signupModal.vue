<template>
  <form class="auth-form" @submit.prevent="formSubmit()"><!-- Inscription -->
    <div class="input-block" @click="formData.error = 0">
      <input type="text" name="username" class="input-form" v-model="formData.username" id="sign-username" :class="{ 'input-error' : formData.error == 1 }" />
      <label for="sign-username" :class="{ 'focus-label' : formData.username }">Nom d'utilisateur</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="text" name="email" class="input-form" v-model="formData.email" id="sign-email" :class="{ 'input-error' : formData.error == 2 }"/>
      <label for="sign-email" :class="{ 'focus-label' : formData.email }">Adresse e-mail</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="password" name="passwrd" class="input-form" v-model="formData.passwrd" id="sign-passwrd" :class="{ 'input-error' : formData.error >= 3 }" />
      <label for="sign-passwrd" :class="{ 'focus-label' : formData.passwrd }">Mot de passe</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="password" name="passwrd-rpt" class="input-form" v-model="formData.passwrdrpt" id="sign-passwrdrpt" :class="{ 'input-error' : formData.error >= 4 }" />
      <label for="sign-passwrdrpt" :class="{ 'focus-label' : formData.passwrdrpt }">Mot de passe (répêtez-le)</label>
    </div>
    <button class="submit-button">Inscription</button>
  </form>
</template>

<script>
export default {
  name: 'signupModal',
  data() {
    return {
      formData: { username: '', email: '', passwrd: '', passwrdrpt: '', error: '' }
    }
  },
  methods: {
    formSubmit() {
      if(this.formData.username) {
        if(this.formData.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
          if(this.formData.passwrd && this.formData.passwrd.length > 5) {
            if(this.formData.passwrdrpt && this.formData.passwrdrpt === this.formData.passwrd) {
              alert('ok');
            } else { this.formData.error = 4 }
          } else { this.formData.error = 3 }
        } else { this.formData.error = 2 }
      } else { this.formData.error = 1 }
    }
  }
}
</script>

<style lang="scss">
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

.auth-content .auth-form .input-block .input-form:focus { background-color: #ececec; }
.auth-content .auth-form .input-block .input-error { background-color: #ffc9c9!important; }

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

.auth-content .auth-form .submit-button {
    position: relative;
    left: 68px;
    width: 200px; height: 40px;
    border: none; outline: 0;
    color: white; font-family: 'Nunito';
    font-weight: bold; font-size: 14px;
    border-radius: 5px;
    background-color: #333;
    margin: 0 auto; margin-top: 25px;
    cursor: pointer;
    transition-duration: 0.25s;
}

.auth-content .auth-form .submit-button::after {
    content: '';
    position: absolute;
    top: 8px; right: 20px;
    width: 28px; height: 25px;
    background: url(/img/arrow-icon.353c91cd.png) no-repeat 100%;
    background-size: 100% 100%;
    transform: rotate(270deg);
    filter: invert(1);
}

.auth-content .auth-form .submit-button:hover {
  background-color: #585879;
  opacity: 0.8;
}
</style>
