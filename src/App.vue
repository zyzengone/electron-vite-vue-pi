<script lang="ts">
  //@ts-nocheck
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
let electron = require('electron')
// let that = this;

export default {
  name: "App",
  data(){
    return {

    }
  },
  mounted(){
    electron.ipcRenderer.on('init_win_id', (event, message) => {
      this.$router.push('/page3');
    })
    electron.ipcRenderer.on('leftPage', (event, message) => {
      this.$router.push('/page2');
    })
  },
  methods:{
    onToPage2(){
      this.$router.push('/page3');
    }
  }
}
</script>

<template>
  <div id="app">
    <!--    <transition>-->
    <!--      <router-view />-->
    <!--    </transition>-->
    <router-view>
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
