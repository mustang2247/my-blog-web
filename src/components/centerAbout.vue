<template>
  <div class="centerAbout">
    <div class="box">
      <h2><i class="fa fa-at"></i> 关于</h2>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerAbout',
  data () {
    return{
      content:'',
    }
  },
  methods: {
    getAbout () {
      this.$api.getAbout().then(res => {
        if(res.status == 200){
          this.content = res.data.about.content
        }
      })
    }
  },
  created () {
    this.getAbout()
  },
}
</script>

<style>
.centerAbout{
  width: 75%;
  min-width: 700;
  float: left;
  min-height: 10px;
}
.centerAbout .box{
  margin: 60px;
}
.centerAbout .box h2{
  font-size: 32px;
  margin-bottom: 20px;
}
.centerAbout .box h1{
  font-weight: 900;
  line-height: 80px;
}
.centerAbout .box pre{
  font-size: 14px;
  color: #660;
  line-height: 44px;
  border-top: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
}
</style>
