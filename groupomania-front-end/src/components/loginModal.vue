<template>
  <form class="auth-form" autocomplete="off" @submit.prevent="formSubmit()"><!-- Connexion -->
    <div class="auth-error" v-if="formData.error">{{ formData.errortxt }}</div>
    <div class="input-block" @click="formData.error = 0" :class="{'email-defined' : formData.email }">
      <input type="text" name="email" class="input-form" v-model="formData.email" id="login-email" :class="{ 'input-error' : formData.error == 1 }" />
      <label for="login-username" :class="{ 'focus-label' : formData.email }">Votre e-mail</label>
    </div>
    <div class="input-block" @click="formData.error = 0">
      <input type="password" name="passwrd" class="input-form" v-model="formData.passwrd" id="login-passwrd" :class="{ 'input-error' : formData.error == 2 }" />
      <label for="login-passwrd" :class="{ 'focus-label' : formData.passwrd }">Mot de passe</label>
    </div>
    <button class="submit-button">Connexion</button>
    <div class="mobile-switch">
      Vous n'avez pas de compte ?
      <span @click="$emit('switchMode')">Inscrivez-vous.</span>
    </div>
  </form>
</template>

<script>
import store from '../modules/store.json'

export default {
  name: 'loginModal',
  props: ['alias'],
  created() {
    if(this.alias) { this.formData.email = this.alias; }
  },
  data() {
    return {
      formData: { email: '', passwrd: '', error: 0, errortxt: '' }
    }
  },
  methods: {
    formSubmit() {
      if(this.formData.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
        if(this.formData.passwrd && this.formData.passwrd.length > 5) {
          this.fetchLogin();
        } else { this.formData.error = 2; this.formData.errortxt = 'Votre mot de passe ne peut pas être aussi court'; }
      } else { this.formData.error = 1; this.formData.errortxt = 'Le format de l\'adresse mail saisie est incorrect'; }
    },
    fetchLogin() {
      this.formData.error = 0; this.formData.errortxt = '';
      const login_request = { email: this.formData.email, passwrd: this.formData.passwrd }
      fetch(store.host_api + '/auth/login', { /* Fetch to API */
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_request),
      })
      .then(response => response.json())
      .then(data => {
        if(!data.error_code) { // Login is valid
          localStorage.setItem('TokenJWT', data.token);
          window.location.reload();
        } else { // Login is not valid
          this.formData.error = data.error_code;
          this.formData.errortxt = data.message;
        }
      })
      .catch((error) => { this.formData.error = 99; this.formData.errortxt = 'Une erreur est survenue (' + error +')'; });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
