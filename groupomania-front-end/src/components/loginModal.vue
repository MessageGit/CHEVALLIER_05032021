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
  </form>
</template>

<script>
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
          alert('ok');
        } else { this.formData.error = 2; this.formData.errortxt = 'Votre mot de passe ne peut pas être aussi court'; }
      } else { this.formData.error = 1; this.formData.errortxt = 'Le format de l\'adresse mail saisie est incorrect'; }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
