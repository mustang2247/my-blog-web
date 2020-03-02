<template>
  <div class="centerArticle">
    <div class="box">
      <h2>{{article.title}}</h2>
      <p class="p1">
        <span class="fa fa-clock-o">&nbsp;{{article.createDate}}&nbsp;&nbsp;</span>
        <span class="fa fa-user blue">&nbsp;{{article.realName}}&nbsp;&nbsp;</span>
        <span class="fa fa-eye">&nbsp;{{article.readCount}}&nbsp;&nbsp;</span>
        <span class="fa fa-tasks blue">&nbsp;{{article.cateName}}</span>
        <span class="fa fa-tags"> {{article.tags}}</span>
      </p>
      
      <div class="articleInfo" v-html="article.content"></div>
      
      <div v-if="preArticle != null && nextArticle != null" class="pan">
        <router-link class="prev" :to="{path:'/Article', query:{id:preArticle.id}}"><i class="fa fa-caret-up"></i> 上一篇：{{preArticle.title}}</router-link>
        <router-link class="next" :to="{path:'/Article', query:{id:nextArticle.id}}">下一篇：{{nextArticle.title}} <i class="fa fa-caret-down"></i></router-link>
      </div>
      <div v-if="preArticle == null && nextArticle != null" class="pan">
        <router-link class="next" :to="{path:'/Article', query:{id:nextArticle.id}}">下一篇：{{nextArticle.title}} <i class="fa fa-caret-down"></i></router-link>
      </div>
      <div v-if="preArticle != null && nextArticle == null" class="pan">
        <router-link class="prev" :to="{path:'/Article', query:{id:preArticle.id}}"><i class="fa fa-caret-up"></i> 上一篇：{{preArticle.title}}</router-link>
      </div>

      <div class="comments">
        <div class="commentsTop"><i class="fa fa-commenting"></i>文章点评 <span>共：{{commentsContent.length}}条</span></div>
        <div class="commentsInput">
          <span class="tit">点评内容：</span>
          <textarea name="" id="" cols="30" rows="10" placeholder="输入点评内容" v-model="submitValue"></textarea>
          <span class="btn" @click="getAddComment"><i class="fa fa-plus"></i> 提交点评</span>
        </div>
      </div>
      <div class="content">
        <p v-for="(item, i) in commentsContent" :key="i"><span>{{item.createDate}}</span> 点评: {{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerArticle',
  props: ['id'],
  data () {
    return{
      article:{},
      preArticle:{},
      nextArticle:{},
      submitValue:'',
      commentsContent:[]
    }
  },
  watch: {
    // '$route' (to, from) {
    //   article = {},
    //   preArticle = {},
    //   nextArticle = null,
    //   this.getArticleData();
    // }
  },
  methods: {
    getArticleData () {
      // console.log("this.id:  ", this.id)
      this.$api.getArticleData({
        id: this.id,
      }).then(res => {
        if(res.status == 200){
          // console.log(res);
          this.article = res.data.data.article;
          this.preArticle = res.data.data.preArticle;
          this.nextArticle = res.data.data.nextArticle;
          this.commentsContent = res.data.data.comments.content;
          // console.log(this.article);
           // 发布日期
          let createDate = this.article.createDate.toString()
          createDate = createDate.slice(0,10);
          createDate = this.getLocalTime(createDate);
          createDate = createDate.slice(0,10);
          createDate = createDate.replace('/', '-');
          createDate = createDate.replace('/', '-');
          this.article.createDate = createDate;
           // 评论日期
          this.commentsContent.forEach(item => {
            let date = item.createDate.toString()
            date = date.slice(0,10);
            date = this.getLocalTime(date);
            date = date.slice(0,10);
            date = date.replace('/', '-');
            item.createDate = date;
          })
        }
      })
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
    getAddComment () {
      console
      this.$api.getAddComment({
        artId: this.id,
        content: this.submitValue,
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.msg == "success"){
          alert("点评成功,感谢您的参与！")
        }
      })
    }
  },
  created () {
    this.getArticleData()
  },
}
</script>

<style>
.centerArticle{
  width: 75%;
  min-width: 700;
  float: left;
  min-height: 10px;
}
.centerArticle .box{
  margin: 60px;
}
.centerArticle .box h2{
  font-size: 36px;
  margin-bottom: 10px;
}
.centerArticle .box .p1{
  color: #999999;
  font-size: 14px;
  margin-bottom: 30px;
}
.centerArticle .box .p2{
  color: #999999;
  font-size: 14px;
  line-height: 1.42857143;
  margin-bottom: 10px;
}
.centerArticle .blue{
  color:#428bca;
}
.centerArticle .articleInfo{
  font-size: 16px;
  line-height: 1.42857143;
  margin-bottom: 20px;
}
.centerArticle .articleInfo p{
  margin-bottom: 10px;
}
.centerArticle .articleInfo a{
  color:#428bca;
}
.centerArticle .pan{
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  padding: 40px 0;
}
.centerArticle .pan a{
  color:#428bca;
}
.centerArticle .pan a:nth-child(2){
  display: inline-block;
  float: right;
}
.comments{
  width: 100%;
  border: 1px solid #bce8f1;
  border-radius: 3px;
  color: #333333;
}
.commentsTop{
  height: 20px;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
  color: #31708f;
  background: #d9edf7;
  border-bottom: 1px solid #bce8f1;
}
.commentsTop span{
  display: inline-block;
  float: right;
}
.commentsInput{
  height: 80px;
  border: 1px solid #CCCCCC;
  margin: 15px;
  border-radius: 6px;
  font-size: 18px;
  display: flex;
  overflow: hidden;
}
.commentsInput .tit{
  width: 123px;
  line-height: 80px;
  display: block;
  text-align: center;
  border-right: 1px solid #CCCCCC;
}
.commentsInput textarea{
  height: 80px;
  float: left;
  flex-grow: 1;
  resize: none;
  padding: 12px;
}
.commentsInput .btn{
  width: 123px;
  line-height: 80px;
  display: block;
  text-align: center;
  background: #00aaee;
  color:#FFFFFF;
  cursor:pointer;
}
.content{
  width: 100%;
  margin: 30px 0;
}
.content p{
  font-size: 14px;
  line-height: 24px;
  padding: 15px 15px;
  color: #333333;
  border-bottom: 1px solid #CCCCCC;
}
.content span{
  display: inline-block;
  border: 1px solid #ff9d9d;
  color:#ff9d9d;
  padding: 0 3px;
  border-radius: 5px;
}
</style>
