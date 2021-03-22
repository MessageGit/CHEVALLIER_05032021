<template>
    <div class="comment-ctn">
        <img src="@/assets/icons/reply-icon.png" class="reply-icon" alt="Réponse de MessageBox">
        <div class="comment-txt">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius metus sit amet nulla sagittis, condimentum semper quam ultricies. Aliquam feugiat vehicula vulputate. Vestibulum fermentum purus dapibus orci mollis, a tincidunt lorem tincidunt. Nunc vitae dolor sed eros vulputate tempor. Integer volutpat blandit pretium.
        </div>
        <div class="comment-infos">
            Le <b>22/03/2021</b> à <b>09h55</b> par <b>MessageBox</b>
        </div>
        <div class="comment-manage">
            <div class="manage-icon">
                <img src="@/assets/icons/edit-icon.png" alt="Editer cette réponse">
            </div>
            <div class="manage-icon">
                <img src="@/assets/icons/delete-icon.png" alt="Supprimer cette réponse">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.comment-ctn {
    position: relative;
    width: 100%; min-height: 45px;
    margin-bottom: 25px;
    padding-bottom: 45px;
}

.comment-ctn .reply-icon {
    position: absolute;
    left: 45px;
    width: 35px;
    opacity: 0.4;
}

.comment-ctn .comment-txt {
    position: relative;
    top: 34px;
    left: 17.5%;
    width: 80%;
    font-size: 13px;
    text-align: justify;
}

.comment-ctn .comment-infos {
    position: absolute;
    left: 17.5%; top: 0px;
    background-color: #9577d4;
    color: white;
    padding: 4px 10px 4px 10px;
    border-radius: 3px;
    font-size: 12px;
}

.comment-ctn .comment-manage {
    position: absolute;
    top: 0px; right: 0px;
}

.comment-ctn .comment-manage .manage-icon {
    position: relative;
    width: 30px; height: 30px;
    float: right;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    cursor: pointer;
    border-radius: 45px;
}

.comment-ctn .comment-manage .manage-icon:hover {
    background-color: #ececec;
}

.comment-ctn .comment-manage .manage-icon img {
    width: 60%;
    height: 60%;
}
</style>