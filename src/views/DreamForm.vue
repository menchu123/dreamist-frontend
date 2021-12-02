<template>
  <FormComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormComponent from "@/components/FormComponent.vue";

export default defineComponent({
  name: "DreamForm",
  components: {
    FormComponent,
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.footer {
  height: 50px;
}
.delete-button {
  color: lightcoral;
  font-size: 16px;
  background-color: darkred;
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  margin-top: 40px;
}
.delete-button:active {
  background-color: lightcoral;
  color: pink;
}
.loading-form {
  @include loading;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgb(3, 17, 56, 0.6);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imagePreviewWrapper {
  width: 100%;
  height: 250px;
  display: block;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center center;
}
.form {
  min-height: 100vh;
  height: 100%;
  padding: 0 20px;
  max-width: $content-width;
  min-width: 280px;
  margin: 0 auto;
  &__top-nav {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100px;
    padding-bottom: 15px;
  }
  &__label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #9aa0af;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  &__input {
    background-color: transparent;
    border: none;
    font-family: inherit;
    font-weight: 600;
    font-size: 24px;
    line-height: 135%;
    width: 100%;
    color: $lightgrey;
    letter-spacing: 0.05em;
  }
  &__input--title {
    resize: none;
    height: 50px;
  }
  &__input::placeholder {
    color: $blue1;
  }
  &__input--description {
    font-size: 16px;
    font-weight: 400;
    font-family: inherit;
    overflow: hidden;
    resize: none;
    height: min-content;
  }
  &__input:focus-visible {
    outline: none;
  }
  &__category-buttons {
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + .form__category-button-label--normal {
      background-color: $normal;
    }
    input[type="radio"]:checked + .form__category-button-label--lucid {
      background-color: $lucid;
    }
    input[type="radio"]:checked + .form__category-button-label--nightmare {
      background-color: $nightmare;
    }
    input[type="radio"]:checked + .form__category-button-label--daydream {
      background-color: $daydream;
    }
    display: flex;
    align-items: center;
    height: 45px;
    background-color: $blue2;
    border-radius: 15px;
    padding: 0 15px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__category-button-label {
    font-size: 14px;
    font-weight: 500;
    line-height: 15px;
    text-align: center;
    border: 1px solid $lightgrey;
    border-radius: 6px;
    padding: 2px 8px;
    margin-right: 10px;
  }
  &__mood-buttons {
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + .form__mood-button-label {
      color: $pink1;
    }
    display: flex;
    font-size: 35px;
    color: $blue1;
    label {
      margin-right: 15px;
    }
  }
  &__file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  &__attachment-button {
    background-color: $blue2;
    color: $blue1;
    font-size: 30px;
    height: 45px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 15px;
    &:active {
      background-color: $lightgrey;
    }
  }
  &__attachment-button--hidden {
    visibility: hidden;
    height: 10px;
  }
  .file-selected {
    font-weight: 400;
    font-size: 14px;
    color: $lightgrey;
    margin: 10px 4px;
  }
  &__back {
    font-size: 25px;
  }
  &__save {
    @include button;
  }
  &__save:disabled {
    background-color: $pink3;
  }
  &__moon {
    margin-right: 10px;
  }
  &__time {
    width: 100%;
    background-color: $blue2;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    .datepicker-toggle {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 19px;
      .datepicker-toggle-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .datepicker-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        box-sizing: border-box;
      }
      .datepicker-input::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
