<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#c85554"
             text-color="#fbfaf5" active-text-color="#392b17" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" ></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    let items = [
      {
        icon: "el-icon-lx-copy",
        index: "/tabs",
        title: "消息通知",
      },

      {
        icon: "el-icon-lx-cascades",
        index: "/table",
        title: "基础表格",
      },

      {
        icon: "el-icon-lx-profile",
        index: "/user",
        title: "我的信息(student)",
      },

      {
        icon: "el-icon-lx-profile",
        index: "/teacherInfo",
        title: "我的信息(teacher)",
      },
      {
        icon: "el-icon-lx-profile",
        index: "/adminUser",
        title: "管理用户",
      },
      {
        icon: "el-icon-lx-profile",
        index: "/adminNotice",
        title: "管理通知",
      },
      {
        icon: "el-icon-lx-profile",
        index: "/adminSystem",
        title: "选导师系统管理",
      },
      {
        icon: "el-icon-lx-searchlist",
        index: "/TeacherTable",
        title: "选学生",
      },


    ];


    const route = useRoute();

    const role_path = {
      teacher: [
        {
          icon: "el-icon-lx-copy",
          index: "/tabs",
          title: "消息通知",
        },

        {
          icon: "el-icon-lx-searchlist",
          index: "/TeacherTable",
          title: "选学生",
        },

        {
          icon: "el-icon-lx-profile",
          index: "/teacherInfo",
          title: "我的信息(teacher)",
        },


      ],
      student: [
        {
          icon: "el-icon-lx-copy",
          index: "/tabs",
          title: "消息通知",
        },

        {
          icon: "el-icon-lx-cascades",
          index: "/table",
          title: "基础表格",
        },

        {
          icon: "el-icon-lx-profile",
          index: "/user",
          title: "我的信息(student)",
        },



      ],
      admin: [
        {
          icon: "el-icon-lx-copy",
          index: "/tabs",
          title: "消息通知",
        },
        {
          icon: "el-icon-lx-addressbook",
          index: "/adminUser",
          title: "管理用户",
        },
        {
          icon: "el-icon-lx-remind",
          index: "/adminN",
          title: "管理通知",
        },
        {
          icon: "el-icon-lx-settings",
          index: "/adminSystem",
          title: "选导师系统管理",
        },




      ]
    }

    const renderData = () => {
      const role = localStorage.getItem('my_role');
      const newItem = role_path[role];
      items = newItem;
    };

    // 需要权限分配的时候开启
    renderData();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();

    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };

  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
