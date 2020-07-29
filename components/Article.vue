<template>
  <div>
    <div
      v-if="title != ''"
      style="margin-left: 1em;font-size: 16px;border-bottom: 1px solid #f0f0f0;"
      class="ant-list-header"
    >{{ title }}</div>
    <a-list itemLayout="vertical" :dataSource="list">
      <a-list-item slot="renderItem" slot-scope="item" :class="{'my_list':hasBorder}">
        <div class="list-title">
          <nuxt-link :to="'/detailed?id=' + item.id">{{ item.title }}</nuxt-link>
        </div>
        <div class="list-icon">
          <span>
            <a-icon type="calendar" />
            {{ formatTime(item.addTime) }}
          </span>
          <span>
            <a-icon type="tags" />
            {{ item.type.typeName }}
          </span>
          <span>
            <a-icon type="user" />
            {{ item.user.username }}
          </span>
        </div>
        <div class="list-context" v-html="formatMarkdown(item.introduce)"></div>
        <div class="list-link">
          <nuxt-link :to="'/detailed?id=' + item.id">
            查看全文 &nbsp;&nbsp;
            <a-icon type="right" />
          </nuxt-link>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import moment from 'moment'
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  name: 'Article',
  props: {
    list: Array,
    title: String,
    hasBorder: Boolean
  },
  mounted() {
    this.markdown()
  },
  methods: {
    formatTime(time) {
      return moment(Number(time)).format('YYYY-MM-DD')
    },
    formatMarkdown(text) {
      return marked(text)
    },
    markdown() {
      const renderer = new marked.Renderer()
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
    }
  }
}
</script>

<style scoped></style>
