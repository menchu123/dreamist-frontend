<template>
  <router-link :to="/dream-form/ + dream.id">
    <section class="dream-prev" :class="{ light: isLight }">
      <div class="dream-prev__left">
        <div class="dream-prev__date">{{ dreamDate() }}</div>
        <div class="dream-prev__moon">
          <font-awesome-icon icon="moon"></font-awesome-icon>
        </div>
      </div>
      <div class="dream-prev__prev">
        <h3 class="dream-prev__title">{{ dream.title }}</h3>
        <p class="dream-prev__text">{{ dreamDescription() }}</p>
        <section class="dream-prev__type" :class="dream.type">{{ dreamType() }}</section>
      </div>
    </section>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "DreamPreview",
  props: ["dream"],
  computed: {
    ...mapState(["isLight"]),
  },
  methods: {
    dreamType() {
      return this.dream.type.toUpperCase();
    },
    dreamDate() {
      return new Date(this.dream.date)
        .toLocaleString("en-US", { month: "short", day: "numeric" })
        .toUpperCase();
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
@import "./src/styles/variables-light";
@import "./src/styles/mixins-light";

.dream-prev {
  background-color: $blue2;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-self: stretch;
  min-height: 126px;
  border-radius: 15px;
  padding-left: 10px;
  border: 1px solid transparent;

  &__prev {
    width: 235px;
  }
  &__text {
    height: 60px;
    overflow: hidden;
  }
  &__left {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__date {
    font-size: 20px;
    line-height: 135%;
    text-align: right;
    width: 52px;
    margin-bottom: 10px;
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
.dream-prev.light {
  background-color: $main1-light;
  color: $font-color-light;
  .dream-prev__type {
    color: $lightgrey-light;
    border-color: $lightgrey-light;
  }
  .normal {
    background-color: $normal-light;
  }
  .lucid {
    background-color: $lucid-light;
  }
  .nightmare {
    background-color: $nightmare-light;
  }
  .daydream {
    background-color: $daydream-light;
  }
}
</style>
