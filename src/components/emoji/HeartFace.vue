<template>
    <div class="face">
        <div class="heartl"></div>
        <div class="heartr"></div>
    </div>
</template>

<script>
    export default {
        name: "HeartFace"
    }
</script>

<style scoped>
    .face{
        border:10vmin solid white;
        border-radius: 80px;
        display: flex;
        width: 70vmin;
        height: 70vmin;
        justify-content: space-between;
    }
    .heartl {
        position:relative;
        width: 20vmin;
        height: 20vmin;
        margin: 100px auto;
        background-color: white;
        transform: rotate(35deg);/*顺时针旋转45度（逆时针旋转是-45deg）*/
    }
    .heartl:before{
        content: "";
        position: absolute;
        top: 0px;
        right: 10vmin;
        width: 20vmin;
        height: 20vmin;
        border-radius: 50%;
        background-color: white;
    }
    .heartl:after {
        content: ""; /*设置:before和:after时必须设置其content属性，否则伪元素就不起作用*/
        position:absolute;/*相对于它的父元素来定位，它的父元素要加上position:relative;*/
        top: -10vmin;
        left: 0;
        width: 20vmin;
        height: 20vmin;
        border-radius: 50%;
        background-color: white;
    }
    .heartr {
        position:relative;
        width: 20vmin;
        height: 20vmin;
        margin: 100px auto;
        background-color: white;
        transform: rotate(55deg);/*顺时针旋转45度（逆时针旋转是-45deg）*/
    }
    .heartr:before{
        content: "";
        position: absolute;
        top: 0px;
        right: 10vmin;
        width: 20vmin;
        height: 20vmin;
        border-radius: 50%;
        background-color: white;
    }
    .heartr:after {
        content: ""; /*设置:before和:after时必须设置其content属性，否则伪元素就不起作用*/
        position:absolute;/*相对于它的父元素来定位，它的父元素要加上position:relative;*/
        top: -10vmin;
        left: 0;
        width: 20vmin;
        height: 20vmin;
        border-radius: 50%;
        background-color: white;
    }
</style>
