<template>
  <form class="auth-form" autocomplete="off" @submit.prevent="formSubmit()"><!-- Inscription -->
    <div class="auth-error" v-if="formData.error">{{ formData.errortxt }}</div>
    <div class="input-block" @click="formData.error = 0">
      <input type="text" name="username" class="input-form" v-model="formData.username" id="sign-username" :class="{ 'input-error' : formData.error == 1 }" />
      <label for="sign-username" :class="{ 'focus-label' : formData.username }">Nom d'utilisateur</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="text" name="email" class="input-form" v-model="formData.email" id="sign-email" :class="{ 'input-error' : formData.error == 2 }"/>
      <label for="sign-email" :class="{ 'focus-label' : formData.email }">Adresse e-mail</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="password" name="passwrd" class="input-form" v-model="formData.passwrd" id="sign-passwrd" :class="{ 'input-error' : formData.error >= 3 && formData.error <= 4 }" />
      <label for="sign-passwrd" :class="{ 'focus-label' : formData.passwrd }">Mot de passe</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="password" name="passwrd-rpt" class="input-form" v-model="formData.passwrdrpt" id="sign-passwrdrpt" :class="{ 'input-error' : formData.error == 4 }" />
      <label for="sign-passwrdrpt" :class="{ 'focus-label' : formData.passwrdrpt }">Mot de passe (répêtez-le)</label>
    </div>
    <button class="submit-button">Inscription</button>
    <div class="mobile-switch">
      Vous avez déjà un compte ?
      <span @click="$emit('switchMode')">Connectez-vous.</span>
    </div>
  </form>
</template>

<script>
import store from '../modules/store.json'

export default {
  name: 'signupModal',
  data() {
    return {
      formData: { username: '', email: '', passwrd: '', passwrdrpt: '', error: 0, errortxt: '' }
    }
  },
  methods: {
    formSubmit() {
      if(this.formData.username) {
        if(this.formData.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
          if(this.formData.passwrd && this.formData.passwrd.length > 5) {
            if(this.formData.passwrdrpt && this.formData.passwrdrpt === this.formData.passwrd) {
              this.fetchSignup();
            } else { this.formData.error = 4; this.formData.errortxt = 'Vos mots de passes ne correspondent pas'; }
          } else { this.formData.error = 3; this.formData.errortxt = 'Votre mot de passe doit être plus long'; }
        } else { this.formData.error = 2; this.formData.errortxt = 'Votre adresse mail semble incorrecte'; }
      } else { this.formData.error = 1; this.formData.errortxt = 'Vous devez saisir un nom d\'utilisateur'; }
    },
    fetchSignup() {
      this.formData.error = 0; this.formData.errortxt = '';
      fetch(store.host_api + '/auth/signup', { /* Fetch to API */
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      })
      .then(response => response.json())
      .then(data => { 
        if(!data.error_code) { // Registration is valid
          this.$emit('isValid', this.formData.email);
        } else { // Registration get error
          this.formData.error = data.error_code;
          this.formData.errortxt = data.message;
        }
      })
      .catch((error) => { this.formData.error = 99; this.formData.errortxt = 'Une erreur est survenue (' + error +')'; });
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/_media.scss';

.auth-content .auth-form .auth-error {
  position: relative;
  margin: 0 auto;
  width: 75%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  background-color: #ececec;
  padding: 2.5%;
  font-size: 13px;
  font-weight: bold;
}

.auth-content .auth-form .email-defined { background-color: #e8f0fe; }
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

.auth-content .auth-form .input-block .input-form:focus { background-color: #e8f0fe; }
.auth-content .auth-form .input-block .input-error { background-color: #fff0f0!important; }

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
    background: url(../assets/icons/arrow-icon.png) no-repeat 100%;
    background-size: 100% 100%;
    transform: rotate(270deg);
    filter: invert(1);
}

.auth-content .auth-form .submit-button:hover {
  background-color: #585879;
  opacity: 0.8;
}

.auth-content .auth-form .mobile-switch {
  position: relative;
  top: 15px; right: 35px;
  text-align: right;
  display: none;
  @include smalllaptop {
    display: block;
  }
}

.auth-content .auth-form .mobile-switch span {
  font-weight: bold;
  cursor: pointer;
}
</style>
