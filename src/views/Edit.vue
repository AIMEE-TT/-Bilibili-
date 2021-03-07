<template>
  <div class="editViews">
     <div style="margin-bottom: 2.778vw">
        <nav-bar></nav-bar>
     </div>
     <div class="uploadfile">
        <div class="uploadimg">
          <van-uploader preview-size="100vw" :after-read="afterRead" />
        </div>
        <edit-banner left="头像">
            <img :src="model.user_img"  slot="right" alt="" v-if="model.user_img">
            <img src="@/assets/default_img.jpg"  slot="right" alt="" v-else>
        </edit-banner>
     </div>
     <edit-banner left="昵称"  @bannerClick="show = true">
       <a href="javascript:;" slot="right">{{model.name}}</a>
     </edit-banner>
     <edit-banner left="账号">
       <a href="javascript:;" slot="right">{{model.username}}</a>
     </edit-banner>
     <edit-banner left="性别" @bannerClick="gendershow = true">
       <a href="javascript:;" slot="right">{{model.gender ? '男' : '女'}}</a>
     </edit-banner>
     <edit-banner left="个签" @bannerClick="textshow = true"></edit-banner>

     <div class="editback" @click="$router.back()">返回个人中心</div>
     <!-- 昵称的弹出框 -->
     <van-dialog v-model="show" 
      title="昵称" 
      show-cancel-button 
      @confirm="confirmClick"
      @cancel="content = ''">
      <!-- autofocus 自动聚焦 content 在data中定义
       @cancel="content = ''" 取消也把content清空
      -->
          <van-field v-model="content"  autofocus />
      </van-dialog>

     <!-- 个签的弹出框 -->
     <van-dialog 
         v-model="textshow"
         title="个签"
         show-cancel-button
         @confirm="textareaClick"
         @cancel="content = ''"
      >
       <van-field v-model="content" type="textarea" autofocus />
     </van-dialog>
     <!-- 性别的弹出框 -->
     <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import NavBar from '../components/common/Navbar'
import EditBanner from '../components/common/editBanner'

export default {
  data() {
    return {
        model: {},
        show: false,
        textshow: false,
        gendershow: false,
        content: '',
        actions: [
            {name: '男', val: 1},
            {name: '女', val: 0}
        ]
    }
  },
  methods: {
    //进入组件调取数据渲染页面
    async selectUser() {
       const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
        this.model = res.data[0] 
    },
    async afterRead(file) {
      // 文件上传使用FormData
      const formdata = new FormData()
      // 把file添加到FormData
      formdata.append('file', file.file)
      // 发送数据，把fromdata传过去
      const res = await this.$http.post('/upload', formdata)
      // 修改img的路径
      this.model.user_img = res.data.url
      // 后台也更新成最新数据
      this.UserUpdate()
    },
    async UserUpdate() {
        const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
        if (res.data.code === 200) {
            this.$msg.fail('修改成功')
        }
    },
    // 昵称弹出框点击确认
    confirmClick() {
        this.model.name = this.content
        this.UserUpdate()
        this.content = ''
    },
    // 个签弹出框点击确认
    textareaClick() {
        this.model.user_desc = this.content
        this.UserUpdate()
        this.content = ''
    },
    // 点击选择完之后执行
    onSelect(data) {
        this.model.gender = data.val
        this.UserUpdate()
        this.gendershow = false
    }
  },
  created(){
      this.selectUser()
   },
  components: {
    'nav-bar': NavBar,
    'edit-banner': EditBanner
  }
}
</script>

<style scoped lang="less">
.editViews a{
    color: #333;
}
.editViews img{
    height: 12.778vw;
    width: 12.778vw;
    border-radius: 50%;
}
.uploadfile{
    overflow: hidden;
    position: relative;
    .uploadimg{
        opacity: 0;
        position: absolute;
    }
}
.editback{
    margin-top: 5.556vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 4.167vw 0;
    font-size: 4vw;
}
</style>