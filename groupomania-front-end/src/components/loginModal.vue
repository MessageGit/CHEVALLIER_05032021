<template>
  <div class="auth-form"><!-- Connexion -->
    <div class="input-block">
      <input type="text" name="username" class="input-form" v-model="formData.email" id="sign-username"/>
      <label for="sign-username" :class="{ 'focus-label' : formData.email }">Nom d'utilisateur</label>
    </div>
    <div class="input-block">
      <input type="password" name="passwrd" class="input-form" v-model="formData.passwrd" id="sign-passwrd" />
      <label for="sign-passwrd" :class="{ 'focus-label' : formData.passwrd }">Mot de passe</label>
    </div>
    <button class="submit-button">Connexion</button>
  </div>
</template>

<script>
export default {
  name: 'loginModal',
  data() {
    return {
      formData: { email: '', passwrd: '' }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
