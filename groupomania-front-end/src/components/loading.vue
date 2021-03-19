<template>
    <div class="loading-content">
        <div class="load-spinner" :class="{'load-fill' : isRotate }"></div>
    </div>
</template>

<script>
export default {
    el: 'Loading',
    data() {
        return {
            isRotate: false
        }
    },
    created() {
        setTimeout(() => {
            this.turnLoading()
        }, 500);
    },
    methods: {
        turnLoading() {
            if(this.isRotate == false) { this.isRotate = true;
            } else { this.isRotate = false }
            setTimeout(() => { this.turnLoading() }, 10000)
        }
    }
}
</script>

<style scoped>
.loading-content {
    position: fixed;
    top: 0px; left: 0px;
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: 9;
    background-color: white;
}

.loading-content .load-spinner {
    position: relative;
    width: 90px; height: 90px;
    border-radius: 90px;
    border: 10px solid #e2e2e2;
    border-top: 10px solid #9238ca;
    transition-duration: 10s;
}

.loading-content .load-fill {
    transform: rotate(3000deg)!important;
}
</style>