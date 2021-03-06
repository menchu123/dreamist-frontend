<template>
  <section class="dream-recording" :class="{ light: isLight }">
    <div class="dream-recording__back" @click="stopRecording">
      <font-awesome-icon icon="angle-left"></font-awesome-icon>
    </div>
    <div class="pulsing-mic">
      <font-awesome-icon class="microphone" icon="microphone"></font-awesome-icon>
    </div>
    <h3 class="dream-recording__message">
      Start describing your dream. The app will stop the recording and redirect you when you finish
      talking.
    </h3>
    <div class="speech-transciption">
      <div>{{ runtimeTranscription }}</div>
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { SpeechRecognitionResult } from "@/types/interfaces";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition?: any;
  }
}

export default defineComponent({
  name: "DreamRecording",
  data() {
    return {
      runtimeTranscription: "",
      lang: "es-ES",
    };
  },
  computed: {
    ...mapState(["isLight"]),
  },
  methods: {
    ...mapActions(["stopRecording", "fillInTranscription"]),
    startTxtToSpeech() {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();
      recognition.lang = this.lang;
      recognition.interimResults = true;

      recognition.addEventListener("result", (event: any) => {
        const text = Array.from(event.results as [SpeechRecognitionResult])
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription = text;
        if (this.runtimeTranscription.length === 600) {
          recognition.stop();
        }
      });

      recognition.addEventListener("end", () => {
        this.fillInTranscription(this.runtimeTranscription);
        this.runtimeTranscription = "";
        recognition.stop();
        this.$router.push("/dream-form");
        this.stopRecording();
      });
      recognition.start();
    },
  },
  mounted() {
    this.fillInTranscription("");
    this.startTxtToSpeech();
  },
});
</script>

<style lang="scss">
@import "./src/styles/variables";
@import "./src/styles/mixins";
@import "./src/styles/mixins-light";

.pulsing-mic {
  background-color: $pink2;
  font-size: 60px;
  color: #fff;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  z-index: 4;

  animation: pulse 2s infinite;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 123, 171, 0.7);
  }

  70% {
    box-shadow: 0 0 0 60px rgba(239, 123, 171, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(239, 123, 171, 0);
  }
}

.dream-recording {
  @include backgroundDark;
  position: fixed;
  z-index: 3;
  background-color: $darkBackground;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__message {
    width: 230px;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    z-index: 4;
  }
  &__back {
    position: absolute;
    top: 40px;
    left: 40px;
    font-size: 30px;
    height: 30px;
    width: 30px;
    z-index: 4;
  }
}
.speech-to-txt {
  display: grid;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: 2px solid grey;
  background-color: rgb(248, 245, 245);
  font-size: 38px;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  place-items: center;
  position: fixed;
}
.speech-transciption {
  top: -10px;
  bottom: -20px;
  right: -20px;
  left: -20px;
  background: transparent;
  position: fixed;
  opacity: 0.15;
  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 500;
  text-align: justify;
}
.dream-recording.light {
  @include backgroundLight;
  .dream-recording__message {
    color: $lightgrey-light;
  }
  .pulsing-mic {
    background-color: $accent1-light;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(162, 167, 208, 0.7);
    }

    70% {
      box-shadow: 0 0 0 60px rgba(162, 167, 208, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(162, 167, 208, 0);
    }
  }
  .speech-transciption {
    color: $lightgrey-light;
    opacity: 0.5;
  }
  .dream-recording__back {
    color: $lightgrey-light;
  }
}
</style>
