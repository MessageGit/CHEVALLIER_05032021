<template>
  <router-view v-if="!loading" :userData="userData" />
  <loading v-else />
</template>

<script>
import store from './modules/store.json'
import loading from './components/loading.vue'

export default {
  data() {
    return {
      userData: '',
      loading: true
    }
  },
  components: {
    loading
  },
  created() {
    const userToken = localStorage.getItem('TokenJWT');
    if(userToken) {
      fetch(store.host_api + '/auth/userdata', {
        method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken }
      })
      .then(response => {
        if(response.status == 201) { return response.json()
        } else { this.initUserData() }
      })
      .then(data => {
        this.initUserData(data)
      })
      .catch((err) => {
        this.userData = '';
        console.log(err)
      });
    } else { this.initUserData() }
  },
  methods: {
    initUserData(data) {
      if(data) { this.userData = data.data;
      } else { this.userData = ''; }
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: white;
  padding: 0; 
  margin: 0;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
