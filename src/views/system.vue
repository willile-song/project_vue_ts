<template>
  <div id="system">
    <el-container class="container-total"> 
        <el-aside width="null" class="aside">
          <SideBarHeader />
          <SideBarMenu />
      </el-aside>
      <el-container class="container-part">
        <el-header class="header">
            <Header />
        </el-header>
        <el-main class="main">
            {{sidebarWidth}}
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBarHeader from '../components/sidebar-header'
import SideBarMenu from '../components/silebar-menu'
import Header from '../components/header'

export default {
    components: {
        SideBarHeader,
        SideBarMenu,
        Header
    },
    computed: {
        sidebarWidth() {
            return this.$store.state.sidebarWidth
        },
        // 通过store中的collapse值改变侧边栏是否显示
        onCollapse() {
            
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