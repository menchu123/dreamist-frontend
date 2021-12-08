<template>
  <VoiceRecognition v-if="isRecording" />
  <router-view :key="$route.path" />
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import VoiceRecognition from "@/components/VoiceRecognition.vue";

export default defineComponent({
  name: "Index",
  components: {
    VoiceRecognition,
  },

  computed: {
    ...mapState(["isMobile", "isLoading", "isSaving", "isRecording"]),
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
      this.isMobileAction(isMobileNow);
    },
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
#app {
  font-family: $font-family;
  letter-spacing: 0.05em;
  background-color: $darkBackground;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: $lightgrey;
  min-height: 100vh;
  width: 100vw;
  min-height: -webkit-fill-available;
  overflow-y: hidden;
}
h2 {
  color: $lightgrey;
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 10px 0;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
}
h3 {
  font-size: 18px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0.05em;
  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }
}

p {
  font-size: 16px;
  font-weight: 300;
  line-height: 120%;
  letter-spacing: 0.05em;
  margin: 0 0 7px;
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
}
a {
  text-decoration: none;
  color: inherit;
  padding: 0;
  margin: 0;
}
button {
  cursor: pointer;
}
</style>
