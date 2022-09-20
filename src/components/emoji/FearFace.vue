<template>
    <div class="face">
        <div class="eyeZayan">
            <div class="eye1Up"></div>
            <div class="eye1Down"></div>
        </div>
        <div class="eyeZayan">
            <div class="eye2Up"></div>
            <div class="eye2Down"></div>
        </div>
    </div>

</template>

<script lang="ts">
//@ts-nocheck
    import anime from "animejs"
    export default {
        name: "FearFace",
        mounted(){
            this.shake();
        },
        methods:{
            shake(){
                anime({
                    targets: '.face',
                    keyframes: [
                        {translateX: -40},
                        {translateX: 0},
                        {translateX: 40},
                        {translateX: 0},
                    ],
                    duration: 1000,
                    delay:1000,
                    easing: 'easeOutElastic(1, .9)',
                    loop: true
                });
            }
        }
    }
</script>

<style scoped>
    .face{
        display: flex;
        width: 70vmin;
        height: 70vmin;
        justify-content: space-between;
    }
    .eyeZayan{
        width: 20%;
        height: 60%;
        /*display: flex;*/
        /*flex-direction: column;*/
    }
    .eye1Up{
        width: 100%;
        height: 60%;
        background-color: #ffffff;
        transform: translate(0,27%) rotate(135deg);
    }

    .eye1Down{
        width: 100%;
        height: 60%;
        background-color: #ffffff;
        transform: translate(0,-40%) rotate(-135deg) ;
    }
    .eye2Up{
        width: 100%;
        height: 60%;
        background-color: #ffffff;
        transform: translate(0,27%) rotate(45deg);
    }

    .eye2Down{
        width: 100%;
        height: 60%;
        background-color: #ffffff;
        transform: translate(0,-40%) rotate(-45deg) ;
    }
</style>
