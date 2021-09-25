<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <SvgIcon icon-class="dashboard" />
    <input type="text" v-model="name" />
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import SvgIcon from "@components/SvgIcon/index.vue";
  import HomeModule from "../dynamicStore/index";
  @Component({
    name: "Home",
    components: {
      SvgIcon,
    },
  })
  export default class Home extends Vue {
    get name() {
      return HomeModule.name;
    }
    set name(name) {
      HomeModule.setName(name);
    }
  }
</script>
