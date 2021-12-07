<template>
  <section class="moon">
    <transition name="moonrise" mode="out-in">
      <img height="80" v-if="enter" src="@/assets/luna.png" alt="moon" class="moon-image" />
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Moon",

  data() {
    return {
      enter: false,
    };
  },
  mounted() {
    this.enter = true;
  },
});
</script>

<style lang="scss">
@import "./src/styles/mixins";
.moon {
  @include moon-transition;
}
</style>
