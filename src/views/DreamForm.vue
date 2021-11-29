<template>
  <form class="form" autocomplete="off" novalidate @submit.prevent>
    <div class="form__top-nav">
      <div class="form__back">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </div>
      <button class="form__save">Save</button>
    </div>
    <section class="form__time">
      <div class="form__time">
        <font-awesome-icon class="form__moon" icon="moon"></font-awesome-icon>
        <span class="datepicker-toggle">
          <span class="datepicker-toggle-button">Sun, 21 November 2021</span>
          <input type="date" class="datepicker-input" />
        </span>
      </div>
    </section>
    <section class="form__title">
      <label for="title" class="form__label form__label--title">Title</label>
      <input
        class="form__input form__input--title"
        type="text"
        name="title"
        id="title"
        placeholder="Write your title here..."
      />
    </section>
    <section class="form__description">
      <label for="description" class="form__label form__label--description">Description</label>
      <input
        class="form__input form__input--description"
        type="text"
        name="description"
        id="description"
        placeholder="Write your description here..."
      />
    </section>
    <section class="form__category">
      <p class="form__label form__label--category">How do we categorize your dream?</p>
      <div class="form__category-buttons">
        <div class="form__category-button">
          <input type="radio" id="normal" name="category" value="normal" checked />
          <label
            for="normal"
            class="form__category-button-label form__category-button-label--normal"
            >NORMAL</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="lucid" name="category" value="lucid" />
          <label for="lucid" class="form__category-button-label form__category-button-label--lucid"
            >LUCID</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="nightmare" name="category" value="nightmare" />
          <label
            for="nightmare"
            class="form__category-button-label form__category-button-label--nightmare"
            >NIGHTMARE</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="daydream" name="category" value="daydream" />
          <label
            for="daydream"
            class="form__category-button-label form__category-button-label--daydream"
            >DAYDREAM</label
          >
        </div>
      </div>
    </section>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DreamForm",
});
</script>

<style lang="scss"></style>
