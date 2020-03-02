<template>
  <div class="rightList">
    <div class="block">
      <h3 class="tit">分 类</h3>
      <div class="list">
        <router-link v-for="(item, i) in navArr2" :key="i" :to="{path:'/',query:{classId:item.id}}">
          <i class="fa fa-caret-right"></i>&nbsp;&nbsp;{{item.name}}
        </router-link>
      </div>
    </div>
    <div class="block">
      <h3 class="tit">高访文章</h3>
      <div class="list">
        <router-link v-for="(item, i) in HotArt" :key="i" :to="{path:'/Article',query:{id:item.id}}">
          <i class="fa fa-chevron-right ri"></i>&nbsp;&nbsp;{{item.title}}
        </router-link>
      </div>
    </div>
    <div class="block">
      <h3 class="tit">最新文章</h3>
      <div class="list">
        <router-link v-for="(item, i) in NewArt" :key="i" :to="{path:'/Article',query:{id:item.id}}">
          <i class="fa fa-chevron-right ri"></i>&nbsp;&nbsp;{{item.title}}
        </router-link>
      </div>
    </div>
    <div class="block">
      <h3 class="tit">站内标签</h3>
    </div>
    <div class="block">
      <h3 class="tit">最新点评</h3>
      <ul class="list2">
        <li v-for="(item, i) in NewComment" :key="i">
          <i class="fa fa-chevron-right ri"></i>
          &nbsp;&nbsp;在
          <router-link class="blue" :to="{path:'/Article',query:{id:item.artId}}">《{{item.artTitle}}》</router-link>
          中点评：{{item.content}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightList',
  data () {
    return{
      navArr2: [],
      HotArt: [],
      NewArt: [],
      NewComment: [],
    }
  },
  methods: {
    // 分类
    getNavList () {
      this.$api.getNavList().then(res => {
        if(res.status == 200){
          this.navArr2 = res.data.data;
        }
      })
    },
    // 高访文章
    getHotArtData () {
      this.$api.getHotArtData().then(res => {
        if(res.status == 200){
          this.HotArt = res.data.content;
        }
      })
    },
    // 最新文章
    getNewArtData () {
      this.$api.getNewArtData().then(res => {
        if(res.status == 200){
          this.NewArt = res.data.content;
        }
      })
    },
    // 最新点评
    getNewCommentData () {
      this.$api.getNewCommentData().then(res => {
        if(res.status == 200){
          this.NewComment = res.data.content;
        }
      })
    }
  },
  created () {
    this.getNavList(),
    this.getHotArtData(),
    this.getNewArtData(),
    this.getNewCommentData()
  }
}
</script>

<style scoped>
.rightList{
  width: 25%;
  min-width: 200;
  float: left;
  min-height: 10px;
}
.block{
  margin: 30px 60px 0 0;
}
.block .tit{
  border-left: 4px #428bca solid;
  padding-left: 12px;
  color: #428bca;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px #428bca dotted;
  padding-bottom: 4px;
  margin-bottom: 10px;
}
.block .list a{
  display: block;
  line-height: 30px;
  width: 100%;
  color: #888;
  font-size: 16px;
}
.block .list a .ri{
  font-size: 8px;
}
.block .list2 li{
  display: block;
  line-height: 30px;
  width: 100%;
  color: #888;
  font-size: 16px;
}
.block .list2 li .ri{
  font-size: 8px;
}
.blue{
  color:#428bca;
}
</style>
