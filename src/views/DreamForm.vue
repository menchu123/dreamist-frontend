<template>
  <form class="form" autocomplete="off" novalidate @submit.prevent="onSubmit">
    <div class="form__top-nav">
      <router-link to="/">
        <div class="form__back">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </div>
      </router-link>
      <button class="form__save" type="submit">Save</button>
    </div>
    <section class="form__time">
      <div class="form__time">
        <font-awesome-icon class="form__moon" icon="moon"></font-awesome-icon>
        <span class="datepicker-toggle">
          <span class="datepicker-toggle-button">{{
            new Date(date).toLocaleString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}</span>
          <input type="date" class="datepicker-input" v-model="date" />
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
        v-model="title"
      />
    </section>
    <section class="form__description">
      <label for="description" class="form__label form__label--description">Description</label>
      <textarea
        class="form__input form__input--description"
        name="description"
        id="description"
        placeholder="Write your description here..."
        @input="adjustSize($event.target)"
        v-model="description"
      />
    </section>
    <section class="form__category">
      <p class="form__label form__label--category">How do we categorize your dream?</p>
      <div class="form__category-buttons">
        <div class="form__category-button">
          <input
            type="radio"
            id="normal"
            name="category"
            value="normal"
            checked
            v-model="category"
          />
          <label
            for="normal"
            class="form__category-button-label form__category-button-label--normal"
            >NORMAL</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="lucid" name="category" value="lucid" v-model="category" />
          <label for="lucid" class="form__category-button-label form__category-button-label--lucid"
            >LUCID</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="nightmare" name="category" value="nightmare" v-model="category" />
          <label
            for="nightmare"
            class="form__category-button-label form__category-button-label--nightmare"
            >NIGHTMARE</label
          >
        </div>
        <div class="form__category-button">
          <input type="radio" id="daydream" name="category" value="daydream" v-model="category" />
          <label
            for="daydream"
            class="form__category-button-label form__category-button-label--daydream"
            >DAYDREAM</label
          >
        </div>
      </div>
    </section>
    <section class="form__mood">
      <p class="form__label form__label--mood">How did you feel when you woke up?</p>
      <div class="form__mood-buttons">
        <div class="form__mood-button">
          <input type="radio" id="1" name="mood" value="1" checked v-model="mood" />
          <label for="1" class="form__mood-button-label form__mood-button-label--1"
            ><font-awesome-icon icon="grin"></font-awesome-icon
          ></label>
        </div>
        <div class="form__mood-button">
          <input type="radio" id="2" name="mood" value="2" v-model="mood" />
          <label for="2" class="form__mood-button-label form__mood-button-label--2"
            ><font-awesome-icon icon="smile"></font-awesome-icon
          ></label>
        </div>
        <div class="form__mood-button">
          <input type="radio" id="3" name="mood" value="3" v-model="mood" />
          <label for="3" class="form__mood-button-label form__mood-button-label--3"
            ><font-awesome-icon icon="meh"></font-awesome-icon
          ></label>
        </div>
        <div class="form__mood-button">
          <input type="radio" id="4" name="mood" value="4" v-model="mood" />
          <label for="4" class="form__mood-button-label form__mood-button-label--4"
            ><font-awesome-icon icon="frown"></font-awesome-icon
          ></label>
        </div>
        <div class="form__mood-button">
          <input type="radio" id="5" name="mood" value="5" v-model="mood" />
          <label for="5" class="form__mood-button-label form__mood-button-label--5"
            ><font-awesome-icon icon="grimace"></font-awesome-icon
          ></label>
        </div>
      </div>
    </section>
    <section class="form__attachments">
      <p class="form__label form__label--attachments">Attachments</p>
      <div
        :class="previewImage === null ? '' : 'form__attachment-button--hidden'"
        class="form__attachment-button"
      >
        <label for="file" class="form__file-label"
          ><font-awesome-icon icon="image"></font-awesome-icon
        ></label>
        <input
          ref="fileInput"
          @input="previewFile"
          type="file"
          name="file"
          id="file"
          class="form__file-input"
        />
      </div>
      <div
        v-if="previewImage !== null"
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage})` }"
        @click="removeFile()"
      ></div>
    </section>
    <section class="footer"></section>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { Image } from "@/types/interfaces";

export default defineComponent({
  name: "DreamForm",
  data() {
    return {
      date: new Date().toISOString().split("T")[0],
      title: "",
      description: "",
      mood: "1",
      category: "normal",
      previewImage: null,
      image: {} as Image,
    };
  },
  methods: {
    ...mapActions(["addDream"]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adjustSize(textarea: any) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    previewFile() {
      const input: HTMLInputElement = this.$refs.fileInput as HTMLInputElement;
      const file = input.files;
      if (file && file[0]) {
        [this.image] = file;
        this.image.isAdded = true;
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = (event: any) => {
          this.previewImage = event.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
    removeFile() {
      this.previewImage = null;
      this.image.isAdded = false;
    },
    onSubmit() {
      const date = new Date(this.date).toISOString();
      const newDream = new FormData();
      newDream.append("title", this.title);
      newDream.append("description", this.description);
      newDream.append("mood", this.mood);
      newDream.append("type", this.category);
      newDream.append("date", date);
      if (this.image.isAdded) {
        newDream.append("image", this.image);
      }
      this.addDream(newDream);
    },
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
.footer {
  height: 20px;
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
    font-weight: 600;
    font-size: 24px;
    line-height: 135%;
    width: 100%;
    color: $lightgrey;
    letter-spacing: 0.05em;
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
    height: auto;
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
