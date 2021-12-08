<template>
  <div class="wip-page" :class="{ light: isLight }">
    <h2 class="wip-message">Under construction</h2>
    <section class="wip">
      <img class="wip-image" src="@/assets/wip.svg" alt="" />
    </section>
    <NavBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "WorkInProgress",
  components: {
    NavBar,
  },
  computed: {
    ...mapState(["user", "isLight"]),
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
@import "./src/styles/mixins-light";

.wip-page {
  padding: 132px 20px 0;
  height: 100%;
  @include backgroundDark;
  @media only screen and (min-width: 768px) {
    padding-top: 60px;
    height: 100%;
  }
}
.wip-page.light {
  .wip-message {
    color: white;
  }
  @include backgroundLight;
  @media only screen and (min-width: 768px) {
    padding-top: 60px;
    height: 100%;
  }
}
.wip-message {
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  margin-top: 60px;
}
.wip {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (min-width: 768px) {
    height: calc(100vh - 164px);
  }
}
.wip-image {
  width: 100%;
  max-width: 400px;
}
</style>
