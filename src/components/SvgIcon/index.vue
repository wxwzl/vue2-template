<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon"></div>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
  import Vue from "vue";
  // doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
  function isExternal(path: string): boolean {
    return /^(https?:|mailto:|tel:)/.test(path);
  }
  export default Vue.extend({
    name: "SvgIcon",
    props: {
      iconClass: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: "",
      },
    },
    computed: {
      isExternal(): boolean {
        return isExternal(this.iconClass);
      },
      iconName(): string {
        return `#icon-${this.iconClass}`;
      },
      svgClass(): string {
        if (this.className) {
          return "svg-icon " + this.className;
        } else {
          return "svg-icon";
        }
      },
      styleExternalIcon(): any {
        return {
          mask: `url(${this.iconClass}) no-repeat 50% 50%`,
          "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
        };
      },
    },
  });
</script>

<style scoped>
  .svg-icon {
    overflow: hidden;
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -0.15em;
  }

  .svg-external-icon {
    display: inline-block;
    background-color: currentColor;
    mask-size: cover !important;
  }
</style>
