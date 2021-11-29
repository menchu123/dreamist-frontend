<template>
  <div class="home">
    <h1 class="title">Journal</h1>
    <DreamPreview />
    <div class="dream-list"></div>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import DreamPreview from "@/components/DreamPreview.vue";

export default defineComponent({
  name: "Home",
  components: {
    NavBar,
    DreamPreview,
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.home {
  @include backgroundDark;
  padding: 132px 20px 0;
  .title {
    max-width: $content-width;
    margin: 0 auto 10px;
  }
  .dream-list {
    height: calc(100vh - 110px - 150px);
    overflow-y: scroll;
    padding-bottom: 30px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
