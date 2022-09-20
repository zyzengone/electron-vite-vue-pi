<template>
    <div class="clock">
        <div class="container" id="timer">
            <svg width="150px" height="150px" class="svg">
                <circle r="70" cy="75" cx="75" stroke-width="8" stroke="#EAEFF4" stroke-linejoin="round" stroke-linecap="round"
                        fill="none" />
                <circle id="path" ref="path1" class="progress" r="70" cy="75" cx="75" stroke-width="8" stroke="#1593FF" stroke-linejoin="round"
                        stroke-linecap="round" fill="none" stroke-dashoffset="0px" stroke-dasharray="1px 437px" />
            </svg>
            <div class="text" ref="timer" id="text">{{time}}</div>
        </div>
    </div>
</template>

<script>
    const { ipcRenderer } = require('electron');
    const Timer = require('timer.js');


    export default {
        name: "TomatoClock",
        data(){
            return{
                workTime:60 * 25,
                restTime:5 * 60,
                status:1,
                time:0,
                timer:{},
                progressLength:437
            }

        },
        methods:{
            init() {
                this.status = 0;
                this.setTimer();
                // setDefaultTime();
                this.updateTime(this.workTime * 1000);
                console.log(this.$refs.path);
                this.$refs.path1.setAttribute('stroke-width', 0);

            },
            updateTime(ms) {
                let s = (ms / 1000).toFixed(0);
                let ss = s % 60;
                let mm = Math.floor((s / 60)).toFixed(0);

                this.time = `${mm.toString().padStart(2, 0)}:${ss.toString().padStart(2, 0)}`;
                this.setProgress(1 - ms / ((this.status === 1 ? 25*60 : 5*60) * 1000));
            },
            setProgress(num) {
                // 可获取路径的长度
                this.$refs.path1.setAttribute('stroke-width', 8);
                this.$refs.path1.setAttribute('stroke-dasharray', `${(this.progressLength * num).toFixed(2)}px ${this.progressLength}px`);
            },
            async startup(){
                let res = 'work';
                if (res === 'rest') {
                    //休息
                    this.status = 2;
                    this.timer.stop();
                    this.timer.start(this.restTime);
                } else if (res === 'work') {
                    //工作
                    this.status = 1;
                    this.timer.stop();
                    this.timer.start(this.workTime);
                }
            },
            setTimer(){
                let that= this;
                this.timer = new Timer({
                    ontick: function (ms) {
                        that.updateTime(ms);
                    },
                    onend: function () {
                        that.updateTime(0);
                        if (this.status === 1) {
                            this.startup();
                        } else if (this.status === 2) {
                            // 休息结束
                            this.timer.stop();
                        }
                    }
                });
            }
        },
        mounted(){
            this.init();
            ipcRenderer.on('J', (event, message) => {
                this.startup();
            })
        }
    }

</script>

<style scoped>
    .clock{
        display: grid;
        place-items: center;
    }
    .container{
        position: relative;
        margin: 40px auto auto;
        width: 170px;
        height: 170px;
    }
    .text{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translateX(-50%) translateY(-50%);
        font-size: 28px;
        color: #1593FF;
    }
    svg {
        transform: rotate(-90deg);
    }
    .btn{
        margin: 10px auto auto;
        width: 80px;
        height: 28px;
        background: rgb(21, 147, 255);
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
    }
    .tip{
        padding-top: 10px;
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 12px;
    }
    .child-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-center{
        display: flex;
        align-items: center;
    }
    svg.icon{
        margin-left: 6px;
        cursor: pointer;
    }
    svg.close{
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .setting-wrap{
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 200px;
        height: 180px;
        background: #fff;
        font-size: 14px;
        z-index: 9;
        border-radius: 4px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
        text-align: left;
        overflow: hidden;
        backface-visibility: hidden;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 8;
        background: rgba(0, 0, 0, .8);
        display: none;
    }
    .setting-title{
        position: relative;
        font-size: 14px;
        text-align: left;
        line-height: 40px;
        color: #333;
        text-indent: 10px;
        border-bottom: 1px solid #eee;
    }
    .setting-time{
        padding-left: 20px;
    }
    .setting-time>label{
        margin-right: 10px;
    }
    .block{
        height: 20px;
    }
    input{
        padding: 0;
        margin: 0;
        width: 50px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 26px;
        line-height: 26px;
        outline: none;
        padding: 0 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    .show{
        display: block !important;
    }
</style>
