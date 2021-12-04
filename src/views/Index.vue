<template>
  <div class="news__container">
    <template v-if="isMobile">
      <div class="left">
        <router-view />
      </div>
    </template>
    <template v-else>
      <div class="left">
        <home />
      </div>
      <div class="right">
        <dream-form></dream-form>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import { defineComponent } from "vue";
import Home from "@/views/Home.vue";
import DreamForm from "@/views/DreamForm.vue";

export default defineComponent({
  name: "Index",
  components: {
    Home,
    DreamForm,
  },
  data: () => ({
    isMobile: false,
  }),

  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  },

  computed: {
    current() {
      return this.$route.name === "Index" || this.$route.name === "AppNewsList" ? Home : DreamForm;
    },
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 768;
    },
  },
});
</script>

<style lang="scss" scoped>
.news__container {
  display: flex;
}
.left {
  flex: 1;
}
.right {
  flex: 1;
}
</style>
