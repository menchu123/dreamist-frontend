<template>
  <div class="app__container">
    <section v-if="(isLoading || isSaving) && !isMobile" class="loading-form">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </section>
    <template v-if="isMobile">
      <div class="left">
        <router-view />
      </div>
    </template>
    <template v-else>
      <div class="left">
        <keep-alive>
          <home />
        </keep-alive>
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
import { mapState } from "vuex";
import Home from "@/views/Home.vue";
import DreamForm from "@/views/DreamForm.vue";

export default defineComponent({
  name: "Index",
  components: {
    Home,
    DreamForm,
  },
  computed: {
    ...mapState(["isMobile", "isLoading", "isSaving"]),
  },
});
</script>

<style lang="scss" scoped>
.app__container {
  display: flex;
  @media only screen and (min-width: 768px) {
    background-image: url("../assets/BackgroundBig.svg");
    background-size: auto;
    background-position-y: top;
    background-repeat: repeat-x;
    padding-top: 40px;
    height: 100vh;
    overflow: hidden;
    .loading-form {
      top: 0;
    }
  }
}
.left {
  flex: 1;
}
.right {
  flex: 1;
}
</style>
