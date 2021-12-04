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
        <dream-form>
          <router-view />
        </dream-form>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Home from "@/views/Home.vue";
import DreamForm from "@/views/DreamForm.vue";

export default defineComponent({
  name: "Index",
  components: {
    Home,
    DreamForm,
  },
  computed: {
    ...mapState(["isMobile"]),
  },

  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    ...mapActions(["isMobileAction"]),
    onResize() {
      const isMobileNow = window.innerWidth < 768;
      console.log(isMobileNow);
      this.isMobileAction(isMobileNow);
    },
  },
});
</script>

<style lang="scss" scoped>
.news__container {
  display: flex;
  @media only screen and (min-width: 768px) {
    background-image: url("../assets/BackgroundBig.svg");
    background-size: auto;
    background-position-y: top;
    background-repeat: repeat-x;
  }
}
.left {
  flex: 1;
}
.right {
  flex: 1;
}
</style>
