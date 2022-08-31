<template>
    <div class="face">
        <div v-if="zayan" class="eyeZayan">
            <div class="eye1Up"></div>
            <div class="eye1Down"></div>
        </div>
        <div v-else class="eye"></div>
        <div v-if="zayan" class="eyeZayan">
            <div class="eye2Up"></div>
            <div class="eye2Down"></div>
        </div>
        <div v-else class="eye"></div>
<!--        <button @click="toggle">toggle</button>-->
    </div>

</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                zayan:false
            }
        },
        mounted(){
          this.move();
        },
        methods:{
            move(){
                var that = this;
                setInterval(function(){
                    that.zayan=!that.zayan
                },500);
            },
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
    .eye{
        width: 20%;
        height: 60%;
        background-color: #ffffff;
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
    .eye{
        width: 20%;
        height: 60%;
        background-color: #ffffff;
    }
</style>
