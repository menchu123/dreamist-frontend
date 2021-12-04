<template>
  <div class="home">
    <h1 class="wip-message">Under construction</h1>
    <section class="wip">
      <img class="wip-image" src="@/assets/wip.svg" alt="" />
    </section>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "WorkInProgress",
  components: {
    NavBar,
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";

.wip-message {
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  margin-top: 60px;
  margin-bottom: 20px;
}
.wip {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.wip-image {
  width: 100%;
  max-width: 400px;
}
</style>
