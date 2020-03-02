<template>
  <div class="home">
    <Navigation @searchFun="getSearchList" :searchValue="searchValue"></Navigation>
    <CenterList :classId="classId" :currPage = "currPage" :searchValue="searchValue" :userId="userId"></CenterList>
    <RightList></RightList>
    <Record></Record>
  </div>
</template>

<script>
import Navigation from '../components/navigation.vue'
import CenterList from '../components/centerList.vue'
import RightList from '../components/rightList.vue'
import Record from '../components/record.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    CenterList,
    RightList,
    Record
  },
  data () {
    return{
      classId: this.$route.query.classId,
      currPage: this.$route.query.currPage || 1,
      searchValue: this.$route.query.searchValue,
      userId: this.$route.query.userId,
    }
  },
  methods: {
    getSearchList (data) {
      this.searchValue = data;
      this.$router.push({path: '/', query: {classId:0, searchValue: this.searchValue}})
    },
  }
}
</script>

<style scoped>
</style>
