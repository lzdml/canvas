<!--
 * @Author: DZL
 * @Date: 2023-07-25 21:56:07
 * @LastEditors: DZL
 * @LastEditTime: 2023-07-25 23:01:33
 * @Description: 
-->
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

  .box {
    box-shadow: rgb(100 100 111 / 20%) 0 7px 29px 0;
  }
</style>
