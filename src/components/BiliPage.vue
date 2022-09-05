<template>
<div>
  <iframe src="https://xbeibeix.com/api/bilibili/biliplayer/?url=BV1EU4y127UZ" allowfullscreen="allowfullscreen" width="100%" height="100%" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>

</div>
</template>

<script>
export default {
  name: "BiliPage"
}
</script>

<style scoped>
.home-video {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: fill;/*这里是关键*/
  width: auto;
  height: auto;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
