<template>
  <div>
    <Header />
    <a-modal
      title="新增留言"
      :visible="visible"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input
        v-model="editorName"
        placeholder="请输入昵称"
      />
      <a-textarea
        v-model="content"
        placeholder="请输入内容"
        :rows="6"
        style="margin-top: 10px"
      />
    </a-modal>
    <a-row class="comm-main" type="flex" justify="center">
      <a-col class="comm-left" :xs="24" :sm="24" :md="16" :lg="18" :xl="14">
        <div>
          <div class="bread-div">
            <a-breadcrumb>
              <a-breadcrumb-item>
                <a href="/">首页</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>留言板</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div
            style="text-align: right;
            padding-top: 10px;
            padding-right: 10px"
          >
          <a-button
            type="primary"
            size="small"
            @click="visible = true"
          >
          添加留言
          </a-button>
        </div>
          <a-list itemLayout="vertical" :dataSource="list">
            <a-list-item slot="renderItem" slot-scope="item,index">
              <div class="authorName">
                <h3>
                  <span style="color:#1e90ff">
                  {{"# " + (index + 1)}}
                  </span>
                  &nbsp;&nbsp;{{item.editorName}}
                </h3>
              </div>
              <div class="msgContent" style="margin-top: 10px">
              <p>{{item.content}}</p>
              </div>
              <div
                class="createTime"
                style="color: #cccccc;text-align: right"
              >
              <a-icon type="calendar" />
              &nbsp;&nbsp;
              {{formatTime(item.createTime)}}
        </div>
            </a-list-item>
          </a-list>
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
  import moment from 'moment'
  import { getMsg,addMsg } from '../../api/api'
  import Header from '../../components/Header.vue'
  import Footer from '../../components/Footer'
  import Author from '../../components/Author'
  import ScrollToTop from '../../components/ScrollToTop'

  export default {
    async asyncData() {
      const {data:{data}} = await getMsg()
      return { msg:data }
    },
    name:'message',
    components:{
      Header,
      Footer,
      Author,
      ScrollToTop
    },
    data(){
      return {
        list:[],
        visible:false,
        editorName:'',
        content:''
      }
    },
    head() {
      return {
        title: 'MWWOW｜留言板'
      }
    },
    created() {
      this.list = this.msg
    },
    methods:{
      async handleOk(){
        if (this.editorName !== "" && this.content !== "") {
          const { data } = await addMsg({
            createTime: new Date().getTime(),
            content:this.content,
            editorName:this.editorName
          });
          if (data.code ===0) {
            this.$message.success("提交成功");
            this.visible = false
            this.editorName = ''
            this.content = ''
            this.getMsgList();
          } else {
            this.$message.error("提交失败");
          }
        } else {
          this.$message.error("昵称和内容不能为空");
        }
      },
      handleCancel() {
        this.visible = false
        this.editorName = ''
        this.content = ''
      },
      async getMsgList() {
        const {data:{data}} = await getMsg()
        this.list = data
      },
      formatTime(time){
        return moment(Number(time)).format("YYYY-MM-DD HH:mm:ss")
      }
    }
  }
</script>

<style  src="../../styles/comm.css"></style>

