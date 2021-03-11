<template>
  <div class="home">
    <div class="intro">
      <h1>
        Plus de collaborateurs, plus de discussions..<br />
        <div class="subtitle">Apprenez en plus de vos collègues avec Groupomania, discutez de tout et de rien, l'essentiel, ne pas se perdre de vue !</div>
      </h1>
    </div>
    <authModal />
  </div>
</template>

<script>
import authModal from '@/components/authModal.vue'

export default {
  name: 'Home',
  components: {
    authModal
  }
}
</script>

<style scoped>
.home {
  position: fixed;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background: url('../assets/img/background.jpg') no-repeat 100%;
  background-size: 100% 100%;
}

.home::after {
  content: '';
  position: absolute;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background-color: #00000094;
}

.home .intro {
  position: absolute;
  left: 0px; top: 0px;
  width: 60%; height: 100%;
  z-index: 1;
  text-align: right;
}

.home .intro h1 {
  margin-top: 35px;
  margin-right: 15px;
  width: 90%;
  float: right;
  font-size: 32px;
  color: white;
}

.home .intro h1 .subtitle {
  position: relative;
  float: right;
  top: 15px;
  width: 70%;
  font-weight: 100;
  font-size: 18px;
}

</style>