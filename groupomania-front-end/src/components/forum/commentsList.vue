<template>
    <div class="comments-content">
        <div class="list-comments">
            <commentPost />
        </div>
        <div class="insert-reply">
            <textarea id="reply-postarea" placeholder="Réagissez à ce post.."></textarea>
            <button id="reply-submit">
                <img src="@/assets/icons/arrow-icon.png" alt="Envoyer ma réponse">
            </button>
        </div>
    </div>
</template>

<script>
import commentPost from '@/components/forum/commentPost.vue'

export default {
    el: 'commentsList',
    components: {
        commentPost
    },
}
</script>

<style scoped>
.comments-content {
    position: relative;
    margin: 0 auto;
    width: 90%;
}

.comments-content .list-comments {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
}

.comments-content .insert-reply {
    position: relative;
    width: 100%;
}

.comments-content .insert-reply #reply-postarea {
    position: relative;
    width: 85%; height: 38px;
    resize: none;
    outline: 0; border: 2px solid #ececec;
    font-family: Nunito;
    padding: 15px 10% 15px 5%;
    border-radius: 90px;
}

.comments-content .insert-reply #reply-submit {
    position: absolute;
    right: 12px; bottom: 20px;
    width: 45px; height: 45px;
    border: none; outline: 0;
    background-color: #9577d4;
    border-radius: 90px;
    cursor: pointer;
    transition-duration: 0.2s;
}

.comments-content .insert-reply #reply-submit:hover {
    opacity: 0.7;
}

.comments-content .insert-reply #reply-submit img {
    position: relative;
    width: 30px; height: 30px;
    transform: rotate(270deg);
    filter: invert(1);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>