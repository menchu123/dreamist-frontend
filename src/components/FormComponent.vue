<template>
  <section v-if="(isSaving || isLoading) && isMobile" class="loading-form">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </section>
  <form
    class="form"
    :class="{ light: isLight }"
    autocomplete="off"
    novalidate
    @submit.prevent="isDetail ? onEdit() : onSubmit()"
  >
    <div v-if="isMobile" class="form__top-nav">
      <router-link to="/">
        <div class="form__back">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </div>
      </router-link>
      <button
        class="form__save"
        type="submit"
        :disabled="title.length < 3 || description.length < 3"
      >
        Save
      </button>
    </div>
    <div class="form-content">
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
        <textarea
          class="form__input form__input--title"
          name="title"
          id="title"
          placeholder="Write your title here..."
          v-model="title"
          @input="adjustSize($event.target)"
          maxlength="25"
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
          @focus="adjustSize($event.target)"
          v-model="description"
          maxlength="600"
          ref="textarea"
          style="`height:${description.scrollHeight}px;overflow-y:hidden;`"
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
            <label
              for="lucid"
              class="form__category-button-label form__category-button-label--lucid"
              >LUCID</label
            >
          </div>
          <div class="form__category-button">
            <input
              type="radio"
              id="nightmare"
              name="category"
              value="nightmare"
              v-model="category"
            />
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
          :class="
            previewImage === null || previewImage === undefined
              ? ''
              : 'form__attachment-button--hidden'
          "
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
          v-if="previewImage !== null && previewImage !== undefined"
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
        >
          <button @click="removeFile()" class="delete-image-button">
            <font-awesome-icon icon="trash-alt"></font-awesome-icon>
          </button>
        </div>
      </section>
      <button v-if="isDetail" class="delete-button" @click.prevent="onDelete">Delete dream</button>
      <div v-if="!isMobile" class="form__top-nav">
        <button
          class="form__save"
          type="submit"
          :disabled="title.length < 3 || description.length < 3"
        >
          Save
        </button>
      </div>
      <section class="footer"></section>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { useRoute } from "vue-router";
import { Image } from "@/types/interfaces";

export default defineComponent({
  name: "FormComponent",
  data() {
    return {
      date: new Date().toISOString().split("T")[0],
      title: "",
      description: "",
      mood: "1",
      category: "normal",
      previewImage: null,
      image: {} as Image,
      isSaving: false,
      isDetail: false,
    };
  },
  computed: {
    ...mapState(["user", "currentDream", "isLoading", "isMobile", "transcription", "isLight"]),
  },
  methods: {
    ...mapActions([
      "addDream",
      "checkToken",
      "getCurrentDream",
      "deleteDream",
      "updateDream",
      "fillInTranscription",
    ]),
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
      if (typeof this.image !== "string") {
        this.image.isAdded = false;
      }
    },
    onDelete() {
      this.deleteDream(this.currentDream.id);
      if (this.isMobile) {
        this.isSaving = true;
        setTimeout(() => {
          this.isSaving = false;
          this.$router.push("/");
        }, 2000);
      } else {
        this.$router.push("/");
      }
    },
    generateFormData() {
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

      return newDream;
    },
    onEdit() {
      const newDream = this.generateFormData();

      const dreamToUpdate = {
        formData: newDream,
        id: this.currentDream.id,
      };
      this.updateDream(dreamToUpdate);
      if (this.isMobile) {
        this.isSaving = true;
        setTimeout(() => {
          this.isSaving = false;
          this.$router.push("/");
        }, 2000);
      }
    },
    onSubmit() {
      const newDream = this.generateFormData();

      this.addDream(newDream);
      if (this.isMobile) {
        this.isSaving = true;
        setTimeout(() => {
          this.isSaving = false;
          this.$router.push("/");
        }, 2000);
      } else {
        this.$router.push("/");
      }
    },
    redirectToLogin() {
      if (!this.user.isAuthenticated) {
        this.$router.push("/login");
      }
    },
    populateForm() {
      this.isDetail = true;

      this.title = this.currentDream.title;
      this.description = this.currentDream.description;
      this.category = this.currentDream.type;
      this.mood = this.currentDream.mood;
      [this.date] = this.currentDream.date.split("T");
      if (this.image) {
        this.image = this.currentDream.image;
        this.previewImage = this.currentDream.image;
      } else {
        this.previewImage = null;
      }

      const description: HTMLElement = this.$refs.textarea as HTMLElement;
      this.$nextTick(() => {
        try {
          description.setAttribute(
            "style",
            `height:${description.scrollHeight}px;overflow-y:hidden;`
          );
        } catch {
          return "Description is null";
        }
      });
    },
  },
  async mounted() {
    this.checkToken();
    this.redirectToLogin();
    if (this.transcription !== "") {
      this.description = this.transcription;
    }
    const route = useRoute();
    const { id } = route.params;
    if (id) {
      await this.getCurrentDream(id);
      this.populateForm();
    }
  },
  beforeUnmount() {
    this.fillInTranscription("");
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
@import "./src/styles/variables-light";
@import "./src/styles/mixins-light";
.footer {
  height: 50px;
}
.form-content {
  height: calc(100vh - 104px);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (min-width: 768px) {
    height: calc(100vh - 145px);
  }
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
.delete-image-button {
  color: lightcoral;
  background-color: darkred;
  font-size: 20px;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
  &:active {
    background-color: lightcoral;
    color: pink;
  }
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
  position: relative;
}
.form {
  min-height: 100vh;
  height: 100%;
  padding: 0 20px;
  max-width: $content-width;
  min-width: 280px;
  margin: 0 auto;
  overflow: scroll;
  @media only screen and (min-width: 768px) {
    max-width: $content-width + 100px;
    margin-top: 104px;
    min-height: auto;
    height: calc(100% - 104px);
    box-sizing: content-box;
  }
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
.form.light {
  background: transparent;
  color: $font-color-light;
  .form__label {
    color: $font-color-light;
  }
  .form__input {
    color: $lightgrey-light;
  }
  .form__input::placeholder {
    color: $main1-light;
  }
  .form__category-buttons {
    background-color: rgba(255, 255, 255, 40%);
    input[type="radio"]:checked + .form__category-button-label--normal {
      background-color: $normal-light;
    }
    input[type="radio"]:checked + .form__category-button-label--lucid {
      background-color: $lucid-light;
    }
    input[type="radio"]:checked + .form__category-button-label--nightmare {
      background-color: $nightmare-light;
    }
    input[type="radio"]:checked + .form__category-button-label--daydream {
      background-color: $daydream-light;
    }
  }
  .form__category-button-label {
    border-color: $lightgrey-light;
    color: $lightgrey-light;
  }
  .form__mood-buttons {
    color: $main1-light;
    input[type="radio"]:checked + .form__mood-button-label {
      color: $accent2-light;
    }
  }
  .form__attachment-button {
    color: $accent3-light;
    background-color: $accent2-light;
  }
  .form__back {
    color: $lightgrey-light;
  }
  .form__save {
    @include button-light;
  }
  .form__time {
    background-color: $main1-light;
  }
}
</style>
