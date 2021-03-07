<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad">
            <div class="detailparent">
              <cover
               class="detailitem"
               :detailitem="categoryitem"
               v-for="(categoryitem,categoryindex) in item.list"
               :key="categoryindex"
               />
            </div>
           </van-list>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '../components/common/Navbar'
import Cover from './cover'
export default {
  data() {
    return {
      category: [],
      active: 0
    }
  },
  components: {
    'nav-bar': NavBar,
    'cover': Cover
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get('/category')
      this.category = this.changeCategory(res.data);
      // 页面加载以后获取文章数据
      this.selectArticle();
    },
    changeCategory(data) {
      // map 在已有的item上进行改造
      const category1 = data.map((item, index) => {
        // 定义数组，代表每一个分类里面应该存储不同的文章数据
        item.list = [];
        // 当前的页数
        item.page = 0;
        // 每页显示数据的条数
        item.pagesize = 10;
        item.finished = false;
        item.loading = true;
        return item;
      });
      return category1;
    },
    // 获取文章的方法
    async selectArticle() {
      const categoryitem = this.categoryItem();
      // get请求要用拼接url的方法把参数带过去
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      // 把数据添加到 categoryitem.list
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      // 已经到底了
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    // 已经到底了
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    // 得到每个栏目不同的id
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    }
  },
  watch: {
    active() {
      const categoryitem = this.categoryItem();
      if (!categoryitem.list.length) {
        this.selectArticle();
      }
    }
  },
  created() {
    this.selectCategory()
  }
}
</script>
<style lang="less">
.home {
  background-color: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>