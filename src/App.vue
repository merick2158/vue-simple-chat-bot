<template>
  <div class="q-pa-md row justify-center">
    <ChatBox />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ChatBox from './components/ChatBox.vue';

@Options({
  components: {
    ChatBox,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "assets/normalizer.css";
body {
  background-color: lighten(#eeeeee, 4%);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #232323;
}
</style>
