<template>
  <div class="about">
    <Navigation @searchFun="getSearchList" :searchValue="searchValue"></Navigation>
    <CenterAbout></CenterAbout>
    <RightList></RightList>
    <Record></Record>
  </div>
</template>

<script>
import Navigation from '../components/navigation.vue'
import CenterAbout from '../components/centerAbout.vue'
import RightList from '../components/rightList.vue'
import Record from '../components/record.vue'
export default {
  name: 'about',
  components: {
    Navigation,
    CenterAbout,
    RightList,
    Record
  },
  data () {
    return{
      searchValue: this.$route.query.searchValue,
    }
  },
  methods: {
    getSearchList (data) {
      this.searchValue = data;
      this.$router.push({path: '/', query: {classId:0, searchValue: this.searchValue}})
    }
  }
}
</script>

<style scoped>
</style>
