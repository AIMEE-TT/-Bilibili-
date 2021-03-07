<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="../assets/bannerTop_new.png" class="backing"/>
    <!-- 用户头像 资料编辑区域 -->
    <user-detail :userInfo="model" />
  </div>
</template>
<script>
import NavBar from '../components/common/Navbar'
import userDetail from '../components/userComponent/userDetail'
export default {
  data() {
    return {
      model: {}
    }
  },
  components: {
    'nav-bar': NavBar,
    'user-detail': userDetail
  },
  methods:{
    async userData() {
      const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]    
    }
  },
  created() {
     this.userData()
  }
}
</script>
<style lang="less">
.userinfo {
.backing {
  width: 100%;
  height: 101px;
}
}
</style>