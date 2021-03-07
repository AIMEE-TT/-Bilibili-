<template>
  <div>
    <!-- 输入任意文本 -->
    <van-field 
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule" 
      v-model="content" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 默认是字符串，数据双向绑定
      content: ''
    }
  },
  props: ['label','type','placeholder','rule'],
  methods: {
    // 当我们满足正则的判断条件的时候，我们应该向父组件
    // 也就是注册页面，发送姓名、账号、密码的内容
    // 之后父组件载发送Ajax请求，发送到服务器
    handlerulg() {
      //判断正则，也就是父组件传进来的正则
      // console.log(this.rule) //  ^.{6,16}$
      // 这个正则是一个字符串，需要转换
      const rue = new RegExp(this.rule)
      // 通过正则校验content，即用户输入的内容
      if (rue.test(this.content)) {
        // 校验成功，定义事件,向父组件发送姓名、账号、密码的内容
        this.$emit('inputChange', this.content)
      } 
    }
  },
  watch: {
    // 监听data里面的数据
    content() {
      this.handlerulg()
    }
  }
}
</script>

<style lang="less">

</style>
