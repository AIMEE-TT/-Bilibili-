<template>
  <div>
   <login-top middleTop="登录bilibili">
    <div slot="right" style="font-size: 3.611vw" @click="$router.push('/register')">切换到注册</div>
   </login-top>
   <login-text label="账号"
      style="margin: 4.167vw 0;"
      rule="^.{6,16}$"
      placeholder="请输入账号"
      @inputChange="res => model.username = res">
   </login-text>
   <login-text label="密码"
       placeholder="请输入密码"
       type="password"
       rule="^.{6,16}$"
       @inputChange="res => model.password = res">
    </login-text>

    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>   
  </div>
</template>

<script>
import LoginTop from '../components/common/LoginTop'
import LoginText from '../components/common/LoginText'
import LoginBtn from '../components/common/LoginBtn'

export default {
  data() {
    return {
     model: {
      // 定义存储用户数据
      username: '',
      password: ''
     }
    }
  },
  components: {
    'login-top': LoginTop,
    'login-text': LoginText,
    'login-btn': LoginBtn
  },
  methods: {
    async registerSubmit() {
      // 再次设置正则
      let rulg = /^.{6,16}$/
      // console.log('按钮被点击了')
      // 发送请求，问题正则判断成功之后是没有数据的
      if(rulg.test(this.model.username) && rulg.test(this.model.password)) {
        // console.log('正则全都校验成功')
        const res = await this.$http.post('/login', this.model)
        // console.log(res)
        this.$msg.fail(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) {
          return
        }
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000)
      } else {
         this.$msg.fail('格式不正确,请重新输入!')
      }
    }
  }
}
</script>

<style lang="less">
</style>
