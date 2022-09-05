<template>
    <div>
        <UsualFace v-if="face=='usual'"></UsualFace>
        <fear-face v-if="face=='fear'"></fear-face>
        <heart-face v-if="face=='heart'"></heart-face>
    </div>

</template>

<script lang="ts">
    //@ts-nocheck
    import UsualFace from "./emoji/UsualFace.vue"
    import FearFace from "./emoji/FearFace.vue"
    import HeartFace from "./emoji/HeartFace.vue"
    export default {
        name: "Home",
        components:{
          UsualFace,
            FearFace,
            HeartFace
        },
        data(){
            return{
                face:'fear'
            }
        },
        mounted(){
          // this.move();
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
