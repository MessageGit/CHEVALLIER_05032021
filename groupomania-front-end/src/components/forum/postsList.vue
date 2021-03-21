<template>
    <div class="posts-content">
        <postForum v-for="post in allPosts" :key="post.id" :dataPost="post" :userData="userData" :userToken="userToken" />
    </div>
</template>

<script>
import store from '@/modules/store.json'

import postForum from '@/components/forum/postForum.vue'

export default {
    el: 'postsList',
    components: {
        postForum
    },
    props: ['userData', 'userToken', 'newPost'],
    data() {
        return {
            allPosts: []
        }
    },
    created() {
        this.getAllPosts()
    },
    methods: {
        getAllPosts() {
            fetch(store.host_api + '/post', {
                method: 'GET', headers: { 'Content-type' : 'application/json' }
            })
            .then(response => {
                if(response.status == 201) { return response.json()
                } else { throw 'Impossible de récupérer le contenu du forum.' }
            })
            .then(data => { this.allPosts = data.postsList })
            .catch((err) => { console.log(err) });
        }
    },
    watch: { // Spec if new post is created for update
        newPost: function(newData) { 
            this.allPosts.unshift(newData) 
        }
    }
}
</script>

<style scoped>
.posts-content {
    position: relative;
    margin-bottom: 70px;
}
</style>

<!-- Updated (21/03/2021) -->