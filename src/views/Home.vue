<template>
  <div class="home">
    <h1 class="title">Journal</h1>
    <div class="dream-list"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.home {
  @include backgroundDark;
  padding: 132px 20px 0;
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
