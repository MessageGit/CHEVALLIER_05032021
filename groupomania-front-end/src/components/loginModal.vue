<template>
  <form class="auth-form" @submit.prevent="formSubmit()"><!-- Connexion -->
    <div class="input-block" :class="{ 'input-error' : formData.error == 1 }" @click="formData.error = 0">
      <input type="text" name="email" class="input-form" v-model="formData.email" id="login-email"/>
      <label for="login-username" :class="{ 'focus-label' : formData.email }">Votre e-mail</label>
    </div>
    <div class="input-block" :class="{ 'input-error' : formData.error == 2 }" @click="formData.error = 0">
      <input type="password" name="passwrd" class="input-form" v-model="formData.passwrd" id="login-passwrd" />
      <label for="login-passwrd" :class="{ 'focus-label' : formData.passwrd }">Mot de passe</label>
    </div>
    <button class="submit-button">Connexion</button>
  </form>
</template>

<script>
export default {
  name: 'loginModal',
  data() {
    return {
      formData: { email: '', passwrd: '', error: 0 }
    }
  },
  methods: {
    formSubmit() {
      if(this.formData.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) {
        if(this.formData.passwrd && this.formData.passwrd.length > 5) {
          alert('ok');
        } else { this.formData.error = 2 }
      } else { this.formData.error = 1 }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
