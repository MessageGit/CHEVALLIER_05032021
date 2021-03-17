<template>
    <div class="post-content">
        <div class="post-profil-img">
            <img src="../assets/icons/profil-test.gif" alt="Image de profil">
        </div>
        <div class="post-infos">
            <span class="post-owner">Posté le <b>04/12/2020</b> à <b>17:39</b><br />par <b>MessageBox</b></span>
            <div class="comments-nbr">
                <img src="../assets/icons/comments-icon.png" alt="Commentaires liés à ce post">
                <span>17 commentaire(s)</span>
            </div>
        </div>
        <div class="parag-post">
            Ob haec et huius modi multa, quae cernebantur in paucis, omnibus timeri sunt coepta. et ne tot malis dissimulatis paulatimque serpentibus acervi crescerent aerumnarum, nobilitatis decreto legati mittuntur: Praetextatus ex urbi praefecto et ex vicario Venustus et ex consulari Minervius oraturi, ne delictis supplicia sint grandiora, neve senator quisquam inusitato et inlicito more tormentis exponeretur.
            <br /><br />
            Ibi victu recreati et quiete, postquam abierat timor, vicos opulentos adorti equestrium adventu cohortium, quae casu propinquabant, nec resistere planitie porrecta conati digressi sunt retroque concedentes omne iuventutis robur relictum in sedibus acciverunt.
        </div>
    </div>
</template>

<script>
export default {
    name: 'postForum'
}
</script>

<style scoped>
.post-content {
    position: relative;
    margin-top: 65px;
    width: 100%; min-height: 90px;
    border: 2px solid transparent;
    border-top: 12px solid #e2e2e2;
}

.post-content .post-profil-img {
    position: absolute;
    top: -35px; left: 45px;
    width: 90px; height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-left: 30px solid white;
    border-right: 30px solid white;
    z-index: 1;
}

.post-content .post-profil-img img {
    position: relative;
    width: 100%; height: 100%;
    border: 2px solid #cecece;
    border-radius: 10px;
}

.post-content .post-infos {
    position: absolute;
    right: 0px;
    width: 72%;
    height: 55px;
    text-align: left;
    display: flex;
    align-items: center;
}

.post-content .post-infos .post-owner {
    position: relative;
    font-size: 14px;
}

.post-content .post-infos .comments-nbr {
    position: absolute;
    right: 0px; bottom: 5px;
    width: 180px; height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.post-content .post-infos .comments-nbr:hover {
    background-color: #f7f7f7;
    border-radius: 45px;
}

.post-content .post-infos .comments-nbr img {
    margin-left: 20px;
    width: 20px;
}

.post-content .post-infos .comments-nbr span {
    font-size: 13px;
    font-weight: bold;
    margin-left: 12px;
    margin-bottom: 2px;
    color: #9577d4;
}

.post-content .parag-post {
    position: relative;
    margin-top: 90px;
    left: 5%; width: 90%;
    padding-bottom: 25px;
    text-align: left;
}
</style>