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
              <a-breadcrumb-item>{{ article.typeName }}</a-breadcrumb-item>
              <a-breadcrumb-item>{{ article.title }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div>
            <div class="detailed-title">{{ article.title }}</div>
            <div class="list-icon center">
              <span>
                <a-icon type="calendar" />
                {{ formatTime(article.addTime) }}
              </span>
              <span>
                <a-icon type="tags" />
                {{ article.typeName }}
              </span>
              <span>
                <a-icon type="user" />
                {{ article.username }}
              </span>
            </div>
            <div class="detailed-content" v-html="html"></div>
          </div>
        </div>
      </a-col>
      <a-col class="comm-right" :xs="0" :sm="0" :md="8" :lg="6" :xl="5">
        <Author-Info :id="article.userId" />
        <a-affix :offsetTop="5" v-if="tocItems.length > 0">
          <div class="detailed-nav comm-box">
            <div class="nav-title">文章目录</div>
            <div class="toc-list">
              <a-anchor affix showInkInFixed>
                <a-anchor-link
                  v-for="item in tocItems"
                  :key="item.anchor"
                  :href="`#${item.anchor}`"
                  :title="item.text"
                >
                  <template v-if="item.children">
                    <a-anchor-link
                      v-for="child in item.children"
                      :key="child.anchor"
                      :href="`#${child.anchor}`"
                      :title="child.text"
                    ></a-anchor-link>
                  </template>
                </a-anchor-link>
              </a-anchor>
            </div>
          </div>
        </a-affix>
        <div class="comm-box" v-else>
          <a-calendar :fullscreen="false" />
        </div>
      </a-col>
    </a-row>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script>
import moment from 'moment'
import { last } from 'lodash'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer'
import AuthorInfo from '../../components/AuthorInfo'
import ScrollToTop from '../../components/ScrollToTop'
import { getArticleById } from '../../api/api'
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  async asyncData({ query }) {
    const {
      data: { data }
    } = await getArticleById(query.id)
    return { article: data }
  },
  watchQuery: ['id'],
  name: 'index',
  components: {
    Header,
    Footer,
    AuthorInfo,
    ScrollToTop
  },
  data() {
    return {
      tocItems: [],
      index: 0,
      html: ''
    }
  },
  head() {
    return {
      title: `MWWOW｜${this.article.title}`
    }
  },
  created() {
    this.markdown()
    this.html = marked(this.article.content)
  },
  methods: {
    formatTime(time) {
      return moment(Number(time)).format('YYYY-MM-DD')
    },
    markdown() {
      const renderer = new marked.Renderer()
      const that = this
      renderer.heading = function(text, level, raw) {
        const anchor = that.add(text, level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
      }
      marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function(code) {
          return hljs.highlightAuto(code).value
        }
      })
    },
    add(text, level) {
      const anchor = `toc${level}${++this.index}`
      const item = { anchor, level, text }
      if (this.tocItems.length === 0) {
        // 第一个 item 直接 push
        this.tocItems.push(item)
      } else {
        let lastItem = last(this.tocItems) // 最后一个 item
        if (item.level > lastItem.level) {
          // item 是 lastItem 的 children
          // for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item]
          } else {
            lastItem = last(children) // 重置 lastItem 为 children 的最后一个 item
            if (item.level <= lastItem.level) {
              // item level 小于或等于 lastItem level 都视为与 children 同级
              children.push(item)
            }
          }
          // }
        } else {
          // 置于最顶级
          this.tocItems.push(item)
        }
      }
      return anchor
    }
  }
}
</script>

<style src="../../styles/comm.css"></style>
<style src="../../node_modules/highlight.js/styles/monokai-sublime.css" />
<style>
.detailed-title {
  font-size: 1.8rem;
  text-align: center;
  padding: 1rem;
}

.center {
  text-align: center;
}

.detailed-content {
  padding: 1.3rem;
  font-size: 1rem;
}

.title-anchor {
  color: #888 !important;
  padding: 4px !important;
  margin: 0rem !important;
  height: auto !important;
  line-height: 1.2rem !important;
  font-size: 0.7rem !important;
  border-bottom: 1px dashed #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active {
  color: rgb(30, 144, 255) !important;
}

.nav-title {
  padding: 0.5rem;
  text-align: center;
  color: #888;
  border-bottom: 1px solid rgb(30, 144, 255);
}

.article-menu {
  font-size: 12px;
}

.ant-anchor-wrapper {
  max-height: 90vh !important;
}

iframe {
  height: 34rem;
}

.detailed-content img {
  width: 100%;
  border: 1px solid #f3f3f3;
}

.title-level3 {
  display: none !important;
}

.ant-anchor-link-title {
  font-size: 12px !important;
}

.ant-anchor-wrapper {
  padding: 5px !important;
}

.detailed-content table,
.detailed-content th,
.detailed-content td {
  border: 1px solid #ccc;
  text-align: center;
}

.detailed-content table {
  width: 100%;
  margin-bottom: 1rem;
  font-size: 15px;
}

.detailed-content thead tr {
  background-color: #f3f3f3;
  height: 3rem;
}

.detailed-content td {
  padding: 5px;
}
</style>
