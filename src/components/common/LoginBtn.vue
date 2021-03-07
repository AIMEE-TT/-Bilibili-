<template>
  <div class="btnparent" @click="registerClick">
   <div class="loginbtn">{{ btntext }}</div>
  </div>
</template>

<script>

export default {
 props: ['btntext'],
 methods: {
   registerClick() {
     // 向父组件发送事件
     this.$emit('registerSubmit')
   }
 }
}
</script>

<style lang="less">
.btnparent {
    padding: 4.167vw 2.778vw;
}
.loginbtn {
    height: 45px;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.25vw;
    font-size: 4.444vw;
}
</style>
