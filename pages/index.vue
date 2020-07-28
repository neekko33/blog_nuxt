<template>
  <div class="container" style="padding-top:3.2rem;">
    <Header />
    <a-row class="comm-main" type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="14">
        <div class="comm-left">
          <Article :list="noticeList" :title="'网站公告'" />
        </div>
        <div class="comm-left">
          <div
            style="margin-left: 1em;font-size: 16px;border-bottom: 1px solid #f0f0f0;"
            class="ant-list-header"
          >
            游研社入口
          </div>
          <div
            style="height: 25em;width: 100%;margin:0.5rem 0;overflow: hidden;"
          >
            <a-carousel autoplay>
              <div v-for="item in yystvData" :key="item.id">
                <a
                  :href="item.href"
                  target="_blank"
                  class="yystv"
                  :style="{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${item.bg})`,
                    backgroundRepeat: 'no-repeat'
                  }"
                >
                  <h1>{{ item.title }}</h1>
                </a>
              </div>
            </a-carousel>
          </div>
        </div>
        <div class="comm-left">
          <Article :list="articleList" :title="'最新文章'" />
        </div>
      </a-col>
      <a-col :xs="0" :sm="0" :md="8" :lg="6" :xl="5">
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
import _ from 'lodash'
import Header from '../components/Header.vue'
import Article from '../components/Article'
import Footer from '../components/Footer'
import Author from '../components/Author'
import ScrollToTop from '../components/ScrollToTop'
import { getArticle, getYystvData, getNotice } from '../api/api'

export default {
  async asyncData() {
    const articleList = await getArticle(1, 10)
    const yystvList = await getYystvData()
    const notice = await getNotice()
    console.log(yystvList)
    return {
      myList: articleList.data.data,
      yystvData: yystvList.data.data,
      noticeItem: [notice.data.data]
    }
  },
  name: 'index',
  components: {
    Header,
    Article,
    Footer,
    Author,
    ScrollToTop
  },
  head() {
    return {
      title: '首页｜MWWOW 联盟魔网'
    }
  },
  data() {
    return {
      articleList: []
    }
  },
  created() {
    const list = _.cloneDeep(this.myList)
    this.noticeList = this.noticeItem
    this.articleList = list.filter(item => {
      return item.id != 4
    })
  }
}
</script>

<style src="../styles/comm.css"></style>
