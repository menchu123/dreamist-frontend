<template>
  <section class="dream-prev">
    <div class="dream-prev__date">{{ dreamDate() }}</div>
    <div class="dream-prev__moon">
      <font-awesome-icon icon="moon"></font-awesome-icon>
    </div>
    <div class="dream-prev__prev">
      <h2 class="dream-prev__title">{{ dream.title }}</h2>
      <p class="dream-prev__text">{{ dreamDescription() }}</p>
      <section class="dream-prev__type" :class="dream.type">{{ dreamType() }}</section>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DreamPreview",
  props: ["dream"],
  methods: {
    dreamType() {
      return this.dream.type.toUpperCase();
    },
    dreamDate() {
      const date = new Date(this.dream.date)
        .toLocaleString("en-US", { month: "short", day: "numeric" })
        .toUpperCase();
      return date;
    },
    dreamDescription() {
      const longDescription = `${this.dream.description.substring(0, 72)}...`;
      if (this.dream.description.length > 70) {
        return longDescription;
      }
      return this.dream.description;
    },
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";

.dream-prev {
  background-color: $blue2;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: $content-width;
  min-width: 280px;
  min-height: 126px;
  border-radius: 15px;
  padding-left: 10px;
  &__prev {
    width: 235px;
  }
  &__text {
    height: 60px;
    overflow: hidden;
  }
  &__date {
    font-size: 20px;
    line-height: 135%;
    text-align: right;
    width: 52px;
  }
  &__type {
    margin: 0 0 15px;
    width: min-content;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.05em;
    border: 1px solid $lightgrey;
    border-radius: 6px;
  }
  .normal {
    background-color: $normal;
    display: none;
  }
  .lucid {
    background-color: $lucid;
  }
  .nightmare {
    background-color: $nightmare;
  }
  .daydream {
    background-color: $daydream;
  }
}
</style>
