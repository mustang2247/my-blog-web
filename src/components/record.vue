<template>
  <div class="record">
    <div class="bottom">© 2019 京ICP备16055315号-3 <span class="fa fa-eye">{{articleReadCount}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return{
      articleReadCount: '',
    }
  },
  methods: {
    getArticleReadCount () {
      this.$api.getArticleReadCount().then(res => {
        if(res.status == 200){
          // console.log(res);
          this.articleReadCount = res.data;
        }
      })
    },
  },
  created () {
    this.getArticleReadCount();
  }
}
</script>

<style scoped>
.record{
  width: 100%;
  height:50px;
  float: left;
}
.bottom{
  width: 100%;
  height:50px;
  background: #F7f7f7;
  box-shadow: 0px 0px 10px #aaa;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
}
.bottom span{
  color: #999;
}
</style>
