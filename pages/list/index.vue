<template>
  <div style="padding-top:3.2rem">
    <Header />
    <a-row class="comm-main" type="flex" justify="center">
      <a-col class="comm-left" :xs="24" :sm="24" :md="16" :lg="18" :xl="14">
        <div>
          <div class="bread-div">
            <a-breadcrumb>
              <a-breadcrumb-item>
                <a href="/">首页</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                {{
                myList.length > 0 ? myList[0].type.typeName : '暂无文章'
                }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <Article :list="myList" :title="''" :hasBorder="myList.length < 4" />
        </div>
      </a-col>
      <a-col class="comm-right" :xs="0" :sm="0" :md="8" :lg="6" :xl="5">
        <Author />
        <div class="comm-box">
          <a-calendar :fullscreen="false" />
        </div>
      </a-col>
    </a-row>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script>
import { getArticleByType } from '../../api/api'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import ScrollToTop from '../../components/ScrollToTop'
import Article from '../../components/Article'

export default {
  async asyncData({ query }) {
    const {
      data: { data }
    } = await getArticleByType(query.id, 1, 100)
    return { myList: data }
  },
  watchQuery: ['id'],
  name: 'index',
  components: {
    Article,
    Header,
    Footer,
    Author,
    ScrollToTop
  },
  head() {
    return {
      title: 'MWWOW｜文章列表'
    }
  }
}
</script>

<style scoped src="../../styles/comm.css"></style>
<style>
.my_list {
  border-bottom: 1px solid #e8e8e8 !important;
}
</style>
