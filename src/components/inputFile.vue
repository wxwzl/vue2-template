<template>
  <input type="file" ref="inputNode" @change="changeImage($event)" :accept="accept" />
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    name: "inputFile",
    props: {
      acceptFormat: {
        type: String,
        default: function () {
          return "image/*";
        },
      },
      maxSize: {
        type: Number,
        default: 0,
      },
      outputFormat: {
        type: String,
        default: "",
      },
    },
    watch: {
      acceptFormat: {
        handler() {
          this.accept = this.acceptFormat;
        },
        immediate: true,
      },
    },
    data() {
      return {
        base64: "",
        accept: "",
      };
    },
    methods: {
      getInstance() {
        return this as any;
      },
      select() {
        this.getInstance().$refs.inputNode.click();
      },
      clear() {
        this.getInstance().$refs.inputNode.value = null;
      },
      changeImage(event: any) {
        let file = event.target.files[0];
        let instance = this.getInstance();
        instance.file = file;
        if (this.maxSize) {
          let isLt8M = file.size / 1024 / 1024 < this.maxSize;
          if (!isLt8M) {
            this.$message.error(`上传的图片大小不能超过 ${this.maxSize}MB!`);
            return false;
          }
        }
        if (this.outputFormat == "arraybuffer") {
          this.readAsArrayBuffer((data: any) => {
            this.$emit("change", {
              data: data,
              arraybuffer: data,
            });
          }, this);
        } else {
          this.readAsDataURL((data: any) => {
            this.$emit("change", {
              data: data,
              base64: data,
            });
          }, this);
        }
      },
      readAsDataURL(callBack: Function, context: any) {
        let instance = this.getInstance();
        if (instance.file) {
          let reader = new FileReader();
          reader.onload = function (e: any) {
            let data = e.target.result;
            callBack && callBack.call(context, data);
          };
          reader.readAsDataURL(instance.file);
        }
      },
      getBlobData() {
        return this.getInstance().file;
      },
      readAsArrayBuffer(callBack: Function, context: any) {
        let instance = this.getInstance();
        if (instance.file) {
          let reader = new FileReader();
          reader.onload = function (e: any) {
            let data = e.target.result;
            callBack && callBack.call(context, data);
          };
          reader.readAsArrayBuffer(instance.file);
        }
      },
    },
  });
</script>
