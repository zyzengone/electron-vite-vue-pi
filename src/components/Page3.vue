<template>
    <div>page3</div>
    <button
            class="change-login-type"
            @click="onToPage2"
    >
        跳转
    </button>
</template>

<script lang="ts">
    //@ts-nocheck
    export default {
        name: "Page3",
        data(){
            return {

            }
        },
        methods:{
            onToPage2(){
                this.$router.push('/page2');
            }
        }
    }
</script>

<style scoped>

</style>
