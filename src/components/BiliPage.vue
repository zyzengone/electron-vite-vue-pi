<template>
<div class="bilibili">
  <iframe class="bili" src="//player.bilibili.com/player.html?aid=543199173&bvid=BV1yi4y1c7Y4&cid=267248641&page=1&as_wide=1&high_quality=1&danmaku=1"
          allowfullscreen="allowfullscreen" width="500" height="500"
          scrolling="no" frameborder="0"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>

</div>
</template>

<script lang="ts">
//@ts-nocheck
export default {

  name: "BiliPage",
  methods:{
  }
}
</script>

<style scoped>
  .bili {
    position: relative;
    overflow: hidden;
    border: 0;
  }
  .bilibili {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
