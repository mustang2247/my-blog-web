<template>
  <div class="list">
    <div class="classification" v-if="cate">
      <p>所在分类：{{cate.cateName}}</p>
      <p>{{cate.cateName}}<span v-if="cate.cateName == 'linux' || cate.cateName == '区块链' || cate.cateName == 'golong' || cate.cateName == '人工智能' || cate.cateName == '数据库'">技术</span></p>
    </div>
    <div class="listone" v-for="(item, i) in lists" :key="i">
      <router-link :to="{path:'/Article' ,query:{id:item.id}}">
        <h3 class="tit">{{item.title}}</h3>
      </router-link>
      <p class="p1">
        <span class="fa fa-clock-o">&nbsp;{{item.createDate}}&nbsp;&nbsp;</span>
        <span class="fa fa-user blue"  @click="cateUserClick(item.userId)">&nbsp;{{item.realName}}&nbsp;&nbsp;</span>
        <span class="fa fa-eye">&nbsp;{{item.readCount}}&nbsp;&nbsp;</span>
        <span class="fa fa-tasks blue" @click="cateNameClick(item.cateId)">&nbsp;{{item.cateName}}</span>
      </p>
      <p class="p2">{{item.title}}</p>
      <p class="p3"><span class="fa fa-tags"> {{item.tags}}</span><span class="right"><i class="fa fa-comments-o i"></i>&nbsp;{{item.commentCount}}</span></p>
    </div>
    <NumPageList :classId="classId" :searchValue="searchValue" :currPage="currPage" :totalElements="totalElements" :totalPages="totalPages"></NumPageList>
  </div>
</template>

<script>
import NumPageList from '../components/numPageList.vue'
export default {
  name: 'centerList',
  components: {
    NumPageList
  },
  props: ['classId', 'currPage', 'searchValue', 'userId'],
  data () {
    return{
      className: '',
      lists: [],
      totalElements: 0,
      totalPages: 0,
      cate:'',
    }
  },
  watch: {
    '$route' (to, from) {
      if(this.classId === 0){
        this.getSearchList();
      }else{
        this.getListData();
      }
    }
  },
  methods: {
    getListData () {
      this.$api.getListData({
        cateId: this.classId,
        currPage: this.currPage-1,
        pageSize: 10,
      }).then(res => {
        if(res.status == 200){
          this.cate = res.data.cate;
          this.lists = res.data.data.content;
          this.totalElements = res.data.data.totalElements;
          this.totalPages = res.data.data.totalPages;
          this.lists.forEach(item => {
            // 发布日期
            let createDate = item.createDate.toString()
            createDate = createDate.slice(0,10);
            createDate = this.getLocalTime(createDate);
            createDate = createDate.slice(0,10);
            createDate = createDate.replace('/', '-');
            createDate = createDate.replace('/', '-');
            item.createDate = createDate;
          })
        }
      })
    },
    // 搜索
    getSearchList () {
      this.$api.getSearchList({
        userId: this.userId,
        condition: this.searchValue,
        currPage: this.currPage-1,
        pageSize: 10,
      }).then(res => {
        if(res.status == 200){
          console.log("res",res);
          this.lists = res.data.date.articles.content;
          this.totalElements = res.data.date.articles.totalElements;
          this.totalPages = res.data.date.articles.totalPages;
          this.lists.forEach(item => {
            // 发布日期
            let createDate = item.createDate.toString()
            createDate = createDate.slice(0,10);
            createDate = this.getLocalTime(createDate);
            createDate = createDate.slice(0,10);
            createDate = createDate.replace('/', '-');
            createDate = createDate.replace('/', '-');
            item.createDate = createDate;
          })
        }
      })
    },
    getLocalTime(nS) {
     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
    // 作者搜索
    cateUserClick (userId) {
      this.$router.push({path: '/', query: {userId:userId}})
    },
    // 类搜索
    cateNameClick (cateId) {
      this.$router.push({path: '/', query: {classId:cateId}})
    }
  },
  created () {
    if(this.userId){
      this.getSearchList();
    }else if(this.classId == 0){
      this.getSearchList();
    }else{
      this.getListData()
    }
  }
}
</script>

<style scoped>
.classification{
  font-size: 14px;
  padding: 20px 0 0 60px;
  line-height: 50px;
}
.list{
  width: 75%;
  min-width: 700;
  float: left;
  min-height: 10px;
  padding-top:30px;
}
.listone{
  margin: 0 30px;
  padding: 20px 30px;
  border-bottom: 1px solid #dddddd;
}
.listone .tit{
  color: #009688;
  font-size: 26px;
  padding: 8px 0px;
}
.listone .p1{
  color: #999999;
  font-size: 14px;
}
.listone .p2{
  color: #999999;
  font-size: 16px;
  margin: 10px 0 18px 0;
}
.listone .p3{
  color: #999999;
  font-size: 14px;
}
.listone .p3 .right{
  display: inline-block;
  float: right;
  color: #428bca;
}
.listone .p3 .right .i{
  color: #999999;
}
.blue{
  color:#428bca;
  cursor:pointer
}
</style>
