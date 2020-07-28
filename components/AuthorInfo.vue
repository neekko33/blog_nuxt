<template>
  <div class="author-div comm-box">
    <div>
      <a-avatar :size="100" :src="author.avatar" />
    </div>
    <div class="author-introduction">
      <h2>{{ author.username }}</h2>
      <p>@{{ author.nickname }}</p>
      <p>{{ author.introduce }}</p>
      <div class="tags" v-for="(item,index) in formatTags" :key="index">
        {{ item }}
      </div>
      <div class="position">
        <a-icon type="pushpin" />
        <span>{{ author.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '../api/api'
export default {
  name: 'Author',
  props: {
    id: Number,
  },
  data() {
    return {
      author: {
        id: null,
        avatar: '',
        username: '',
        nickname: '',
        tags: '',
        address: '',
        introduce: '',
      },
    }
  },
  created() {
    this.getData()
  },
  computed: {
    formatTags() {
      return this.author.tags.split(',')
    },
  },
  methods: {
    async getData() {
      const {
        data: { data },
      } = await getUserInfo(this.id)
      this.author = data
    },
  },
}
</script>

<style scoped>
.author-div {
  text-align: center;
  padding: 1rem;
  padding-top: 1.5rem;
}

.author-div div {
  /* margin-bottom: 1rem; */
}

.author-introduction {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #999;
}

.account {
  background-color: #999;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.tags {
  color: #6a6a6a;
  background-color: #efefef;
  margin-bottom: 0.5em;
  padding: 0.4em 0.7em;
  font-weight: normal;
  display: inline-block;
  line-height: 1;
  vertical-align: baseline;
  margin: 0em 0.14285714em;
  background-color: #e8e8e8;
  background-image: none;
  padding: 0.5833em 0.833em;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  font-weight: bold;
  border: 0px solid transparent;
  border-radius: 0.28571429rem;
  -webkit-transition: background 0.1s ease;
  transition: background 0.1s ease;
}

.position {
  padding: 1rem;
}
</style>
