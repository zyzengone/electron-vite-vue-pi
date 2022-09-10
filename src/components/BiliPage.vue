<template>
<div>
  <iframe id="iframe"
          name="iframe"
          height="100%"
          width="100%"
          src="https://www.baidu.com"
          scrolling="auto"
          frameborder="0"
          onload="changeFrameHeight()">
  </iframe>

</div>
</template>

<script>
  window.onresize = function() {
    changeFrameHeight();
  }
  function changeFrameHeight() {
    var iframe = document.getElementById("iframe");
    iframe.height = document.documentElement.clientHeight;
  }
export default {

  name: "BiliPage",
  methods:{
    changeFrameHeight() {
      var iframe = document.getElementById("iframe");
      iframe.height = document.documentElement.clientHeight;
    }
  }
}
</script>

<style scoped>

</style>
