<template>
<div class="loading-wrapper">
    <div class="loading-wrapper-inner">
        <v-icon>mdi-loading</v-icon>
    </div>
</div>
</template>

<script>
export default {
    name: 'LoadingComponent'
}
</script>

<style lang="scss">
    .loading-wrapper {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(black , .70);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;

        &-inner {
            display: block;

            i {
                color: white !important;
                font-size: 45px !important;
                animation-name: rotate;
                animation-timing-function: linear;
                animation-fill-mode: both;
                animation-duration: 500ms;
                animation-iteration-count: infinite;
            }
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg)
            }
        }
    }
</style>
