<template>
  <section class="moon">
    <transition name="moonrise" mode="out-in">
      <img
        @click="toggleLight"
        height="80"
        v-if="enter"
        :src="require(`@/assets/${myImageSource}.png`)"
        alt="moon"
        :key="myImageSource"
        class="moon-image"
      />
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "Moon",

  data() {
    return {
      enter: false,
      imgSourceDark: "luna",
      imgSourceLight: "sol",
    };
  },
  computed: {
    ...mapState(["user", "isLight"]),

    myImageSource() {
      return this.isLight ? this.imgSourceLight : this.imgSourceDark;
    },
  },
  methods: {
    ...mapActions(["toggleLight"]),
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
