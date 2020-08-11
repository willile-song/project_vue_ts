<template>
  <div id="sidebar-menu">
    <el-menu
      background-color="rgb(16, 28, 41) "
      text-color="#ccc"
      active-text-color="#fff"
      :unique-opened="true"
    >
      <el-submenu :index="child1.url" v-for="child1 in menuList" :key="child1.url">
        <template slot="title">
          <i :class="child1.icon"></i>
          {{child1.name}}
        </template>
        <el-menu-item-group v-if="child1.childNode">
          <el-menu-item
            index="child2.id"
            v-for="child2 in child1.childNode"
            :key="child2.id"
          >{{child2.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: "首页",
          pid: 1,
          id: 1,
          url: "/main",
          icon: "el-icon-s-home",
        },
        {
          name: "文件",
          pid: 1,
          id: 2,
          url: "/file",
          icon: "el-icon-document",
          childNode: [
            {
              name: "电子签约",
              pid: 2,
              id: 3,
              url: "/sign",
            },
            {
              name: "文件统计",
              pid: 2,
              id: 4,
              url: "/filecensus",
            },
          ],
        },
        {
          name: "印控",
          pid: 1,
          id: 3,
          url: "/sealcontrol",
          icon: "el-icon-s-check",
          childNode: [
            {
              name: "电子签章",
              pid: 3,
              id: 5,
              url: "/electronic-signature",
            },
          ],
        },
        {
          name: "组织",
          pid: 1,
          id: 4,
          url: "/organization",
          icon: "el-icon-s-custom",
          childNode: [
            {
              name: "基本信息",
              pid: 4,
              id: 6,
              url: "/info",
            },
            {
              name: "组织和成员",
              pid: 4,
              id: 7,
              url: "/organ-member",
            },
            {
              name: "权限管理",
              pid: 4,
              id: 8,
              url: "/power-management",
            },
            {
              name: "费用中心",
              pid: 4,
              id: 9,
              url: "/cost-center",
            },
          ],
        },
        {
          name: "配置",
          pid: 1,
          id: 5,
          url: "/config",
          icon: "el-icon-s-tools",
          childNode: [
            {
              name: "模板库管理",
              pid: 5,
              id: 10,
              url: "/template-library-management",
            },
            {
              name: "业务流配置",
              pid: 5,
              id: 11,
              url: "/business-flow-config",
            },
          ],
        },
        {
          name: "审计",
          pid: 1,
          id: 6,
          url: "/audit",
          icon: "el-icon-document-copy",
        },
      ],
    };
  },

  computed: {
    majorArray() {
      const arr = [];
      this.menu.map((item) => {
        if (typeof item !== "object") {
          arr.push(item);
        } else {
          arr.push(item[0]);
        }
      });
      return arr;
    },
    minorArray() {
      return this.menu.filter((item) => typeof item === "object");
    },
  },
};
</script>

<style scoped>
#sidebar-menu {
  background-color: #001330;
}
</style>