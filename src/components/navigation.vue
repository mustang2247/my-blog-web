<template>
  <div class="navigation">
    <div  class="warp">
      <div class="nav">
        <router-link :to="{path:'/'}">首页</router-link>
        <router-link v-for="(item, i) in navArr" :key="i" :to="{path:'/',query:{classId:item.id}}">
          {{item.name}}
        </router-link>
        <router-link :to="{path:'/About'}">@关于</router-link>
      </div>
      <div class="search">
        <div class="box">
          <input type="text" :placeholder="articleCount" v-on:keyup.enter="search" v-model="searchValueNew"/>
          <span class="fa fa-search" @click="search"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: ['searchValue'],
  data () {
    return{
      searchValueNew: '',
      navArr: [],
      articleCount: '',
    }
  },
  inject: ['reload'],  // 注入重载的功能（注入依赖）
  //监视
  watch: {
   //检测路由参数发生改变时，刷新当前页面 调用
   '$route': function(){
      this.reload();
    }
  },
  methods: {
    getNavList () {
      this.$api.getNavList().then(res => {
        if(res.status == 200){
          this.navArr = res.data.data;
        }
      })
    },
    search () {
      this.$emit('searchFun',this.searchValueNew)
    },
    getArticleCount () {
      this.$api.getArticleCount().then(res => {
        if(res.status == 200){
          this.articleCount = '在' + res.data + '篇文章中搜索';
        }
      })
    }
  },
  created () {
    this.getNavList();
    this.getArticleCount();
    if(this.searchValue !== null){
      this.searchValueNew = this.searchValue;
    }
  }
}
</script>

<style scoped>
.navigation{
  width: 100%;
  height:65px;
}
.warp{
  height: 65px;
  box-shadow: 0 0 3px #888888;
}
.nav{
  width: 75%;
  float: left;
}
.nav>a{
  display: block;
  float: left;
  height: 65px;
  font-size: 16px;
  line-height: 65px;
  padding: 0 10px;
  color: rgb(123, 104, 121);;
}
.nav>a:nth-child(1){
  margin-left: 50px;
}
.search{
  width: 25%;
  float: left;
}
.search .box{
  width: 80%;
  border: 1px solid #CCCCCC;
  border-radius: 6px;
  height: 44px;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}
.search input{
  width: 80%;
  height: 24px;
  padding: 10px;
  float: left;
  font-size: 18px;
  font-family: "微软雅黑";
}
.search span{
  display: block;
  width: 50px;
  height: 44px;
  float: left;
  font-size: 18px;
  text-align: center;
  line-height: 44px;
  position: absolute;
  top:0;
  right: 0;
  border-left: 1px solid #CCCCCC;
}
</style>
