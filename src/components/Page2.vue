<template>
    <div>page2</div>
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
        name: "Page2",
        data(){
            return {

            }
        },
        methods:{
            onToPage2(){
                this.$router.push('/page3');
            }
        }
    }
</script>

<style scoped>

</style>
