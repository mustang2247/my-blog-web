<template>
  <div class="article">
    <Navigation></Navigation>
    <CenterArticle :id="id"></CenterArticle>
    <RightList></RightList>
    <Record></Record>
  </div>
</template>

<script>
import Navigation from '../components/navigation.vue'
import CenterArticle from '../components/centerArticle.vue'
import RightList from '../components/rightList.vue'
import Record from '../components/record.vue'
export default {
  name: 'Article',
  components: {
    Navigation,
    CenterArticle,
    RightList,
    Record
  },
  data () {
    return{
      id: this.$route.query.id,
    }
  },
}
</script>

<style scoped>
</style>
