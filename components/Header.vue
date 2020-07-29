<template>
  <div
    class="header"
    style="position:fixed;top:0;left:0;width:100%;z-index:999"
  >
    <a-row type="flex" justify="center">
      <a-col :xs="21" :sm="21" :md="11" :lg="16" :xl="15">
        <span class="header-logo">MWWOW</span>
        <span class="header-txt">联盟魔网</span>
      </a-col>
      <a-col
        class="memu-div"
        :xs="3"
        :sm="3"
        :md="13"
        :lg="7"
        :xl="4"
        style="text-align:right"
      >
        <a-menu mode="horizontal">
          <a-menu-item key="home" @click="handleClickHome">
            <a-icon type="home" />首页
          </a-menu-item>
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="tags" />标签
            </span>
            <a-menu-item
              v-for="item in typeList"
              :key="item.id"
              @click="handleClickType"
              >{{ item.typeName }}</a-menu-item
            >
          </a-sub-menu>
          <!-- <a-menu-item key="life" @click="handleClickMessage">
            <a-icon type="heart" />留言板
          </a-menu-item>-->
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getType } from '../api/api'

export default {
  name: 'Header',
  data() {
    return {
      typeList: null
    }
  },
  async mounted() {
    const typeList = window.sessionStorage.getItem('type_list')
    if (typeList) {
      this.typeList = JSON.parse(typeList)
    } else {
      const {
        data: { data }
      } = await getType()
      this.typeList = data.filter(item => item.id != 4)
      window.sessionStorage.setItem('type_list', JSON.stringify(this.typeList))
    }
  },
  methods: {
    handleClickHome() {
      this.$router.push('/')
    },
    handleClickType(e) {
      this.$router.push({ name: 'list', query: { id: e.key } })
    },
    handleClickMessage() {
      this.$router.push('/message')
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  padding: 0.4rem;
  overflow: hidden;
  height: 3.2rem;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.header-logo {
  color: #1e90ff;
  font-size: 1.4rem;
  text-align: left;
}

.header-txt {
  font-size: 0.6rem;
  color: #999;
  display: inline-block;
  padding-left: 0.3rem;
}

.ant-menu {
  line-height: 2.8rem;
}

.ant-menu-submenu {
  line-height: 2.8rem;
}

.ant-menu-item {
  font-size: 1rem !important;
  padding: 0px !important;
  text-align: center;
}

.submenu-title-wrapper {
  font-size: 1rem !important;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
