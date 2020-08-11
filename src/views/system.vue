<template>
  <div id="system">
    <el-container class="container-total"> 
        <el-aside :width="width" class="aside">
          <SideBarHeader />
          <SideBarMenu />
      </el-aside>
      <el-container class="container-part">
        <el-header class="header">
            <Header />
        </el-header>
        <el-main class="main">
          main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBarHeader from '../components/sidebar-header'
import SideBarMenu from '../components/silebar-menu'
import Header from '../components/header'
import { mapState } from 'vuex'

export default {
    components: {
        SideBarHeader,
        SideBarMenu,
        Header
    },
    computed: {
      width() {
        return this.$store.getters.sidebarWidth
      }
    }
}
</script>

<style scoped>
#system {
  width: 100%;
  height: 100%;
}
.container-total {
  width: 100%;
  height: 100%;
  background-color: #f7f8f8;
}
.aside {
  height: 100%;
  background-color: #001330;
  color: #fff;
  width: 217px;
  transition: .6s;
}

.header {
    height: 35px;
    background-color: #fff;
}
.main {
    margin: 15px;
    background-color: #fff;
}
.header {
    padding: 12px 15px;
}
</style>