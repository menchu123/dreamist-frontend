<template>
  <section class="dream-prev">
    <div class="dream-prev__date">JAN 1</div>
    <div class="dream-prev__moon">
      <font-awesome-icon icon="moon"></font-awesome-icon>
    </div>
    <div class="dream-prev__prev">
      <h2 class="dream-prev__title">{{ title }}</h2>
      <p class="dream-prev__text">{{ description }}...</p>
      <section class="dream-prev__type">{{ type }}</section>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DreamPreview",
  props: {
    title: String,
    description: String,
    date: String,
    type: String,
    _id: String,
  },
  methods: {},
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
  &__prev {
    width: 235px;
  }
  &__text {
    min-height: 60px;
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
    background-color: #00b5b8;
  }
}
</style>
