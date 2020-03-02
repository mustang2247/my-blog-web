<template>
  <div class="numPageList" v-if="totalPages !== 0">
    <div class="pageBox">
      <div class="1" @click="firstPage">首页</div>
      <div class="2" @click="prevPage" v-if="page !== 1">上一页</div>
      <div class="3" @click="prevPage4" v-if="page === totalPages && page > 4" >{{page-4}}</div>
      <div class="4" @click="prevPage3" v-if="(page === totalPages || page === totalPages-1) && page > 3" >{{page-3}}</div>
      <div class="5" @click="prevPage2" v-if="page !== 1 && page !== 2" >{{page-2}}</div>
      <div class="6" @click="prevPage" v-if="page !== 1" >{{page-1}}</div>
      <div class="7" style="color:#FFFFFF; background: #428bca;">{{page}}</div>
      <div class="8" @click="nextPage" v-if="page !== totalPages">{{1+parseInt(page)}}</div>
      <div class="9" @click="nextPage2" v-if="page !== totalPages && page !== totalPages-1">{{2+parseInt(page)}}</div>
      <div class="10" @click="nextPage3" v-if="(page === 1 && totalPages > 3) || (page === 2 && totalPages > 4)" >{{3+parseInt(page)}}</div>
      <div class="11" @click="nextPage4" v-if="page === 1 && totalPages > 4" >{{4+parseInt(page)}}</div>
      <div class="12" @click="nextPage" v-if="page !== totalPages">下一页</div>
      <div class="13" @click="lastPage">尾页</div>
      <div>共{{totalPages}}页 / {{totalElements}}条</div>
    </div>
  </div>
</template>
<!-- (page === 1 || page === 2) && totalPages > 3 -->
<script>
export default {
  name: 'numPageList',
  props: ['classId', 'currPage', 'totalPages', 'totalElements', 'searchValue'],
  data() {
    return {
      page:this.currPage,
    }
  },
  methods: {
    // 翻页
    firstPage () {
      if(this.page === 1) return
      this.page = 1
      this.setMessage()
    },
    lastPage () {
      if(this.page === this.totalPages) return
      this.page = this.totalPages
      this.setMessage()
    },
    prevPage () {
      if(this.page === 1) return
      this.page--
      this.setMessage()
    },
    prevPage2 () {
      this.page = this.page - 2
      this.setMessage()
    },
    prevPage3 () {
      this.page = this.page - 3
      this.setMessage()
    },
    prevPage4 () {
      this.page = this.page - 4
      this.setMessage()
    },
    nextPage () {
      if(this.page === this.totalPages) return
      this.page++
      this.setMessage()
    },
    nextPage2 () {
      this.page = this.page + 2
      this.setMessage()
    },
    nextPage3 () {
      this.page = this.page + 3
      this.setMessage()
    },
    nextPage4 () {
      this.page = this.page + 4
      this.setMessage()
    },
    setMessage(){
      if(this.page === 1){
        this.$router.push({path: '/', query: {classId:this.classId, searchValue: this.searchValue}})
      }else{
        this.$router.push({path: '/', query: {classId:this.classId, currPage: this.page, searchValue: this.searchValue}})
      }
    }
  }
}
</script>

<style scoped>
.numPageList{
  text-align: center;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.pageBox{
  display: inline-block;
  text-align: center;
  margin: 20px 0;
  border-top: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
}
.pageBox div{
  display: inline-block;
  float: left;
  padding: 10px 16px;
  cursor:pointer;
  color:#428bca;
  font-size: 18px;
}
</style>
