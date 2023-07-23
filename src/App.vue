<template>
  <router-view />
</template>
<script setup lang="ts"></script>

<style>
  /* @font-face {
    font-family: "Ali_HT";
    src: url('./assets/fonts/heiti.ttf');
    font-weight: normal;
    font-style: normal;
  } */

  html,
  body {
    height: 100%;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  .container {
    min-height: 100%;
    padding-bottom: 50px;
  }

  .content {
    max-width: 750px;
    margin: 0 auto;
    min-height: 100%;
  }
</style>
