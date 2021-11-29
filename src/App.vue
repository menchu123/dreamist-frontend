<template>
  <router-view />
</template>

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
}
h1 {
  color: $lightgrey;
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 10px 0;
}
h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0.05em;
}

p {
  font-size: 16px;
  font-weight: 300;
  line-height: 120%;
  letter-spacing: 0.05em;
  margin: 0 0 7px;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
