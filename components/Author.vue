<template>
  <div class="author-div comm-box">
    <div>
      <a-avatar :size="100" src="http://212.64.78.155/images/网站图标.png" />
    </div>
    <div class="author-introduction">
      <h2>联盟魔网</h2>
      <div style="text-align: left;margin-top: 1rem">
        <i
          >Race does not mean that glory, I have seen the best of Orcs, have
          seen the most despicable human beings.</i
        ><br />
      </div>
      <div style="text-align: right;margin-bottom: 1rem">
        <i> ————— Shiliao · Fuding</i>
      </div>
      <a-divider> 外站链接</a-divider>
      <a
        href="https://www.yystv.cn/"
        style="color: rgb(247,209,73);font-weight:bold"
        >游研社官网</a
      ><br />
      <!--      <a-->
      <!--        href="https://www.gcores.com/"-->
      <!--        style="color: rgb(226,82,65);font-weight:bold"-->
      <!--        >机核网官网</a-->
      <!--      ><br />-->
      <a
        href="https://www.bilibili.com/"
        style="color: rgb(235,123,153);font-weight:bold"
        >哔哩哔哩官网</a
      ><br />
      <a href="http://bbs.nga.cn/" style="color: rgb(82,29,11);font-weight:bold"
        >NGA玩家社区</a
      ><br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author'
}
</script>

<style scoped>
.author-div {
  text-align: center;
  padding: 1rem;
}

.author-div div {
  margin-bottom: 1rem;
}

.author-introduction {
  font-size: 0.8rem;
  color: #999;
}

.account {
  background-color: #999;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
