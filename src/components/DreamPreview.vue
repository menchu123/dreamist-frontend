<template>
  <section class="dream-prev">
    <div class="dream-prev__date">JAN 1</div>
    <div class="dream-prev__moon">
      <font-awesome-icon icon="moon"></font-awesome-icon>
    </div>
    <div class="dream-prev__prev">
      <h2 class="dream-prev__title">Title of dream</h2>
      <p class="dream-prev__text">
        Cat slap dog in face. Present belly, stare at imaginary bug. Meow for food, then chas...
      </p>
      <section class="dream-prev__type">LUCID</section>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DreamPreview",
});
</script>

<style lang="scss"></style>
