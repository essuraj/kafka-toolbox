<template>
  <div>
    <nav-bar v-on:status="connectionSignal"></nav-bar>
    <div class="card" v-for="(v,k) in topics">
      <h2>{{k}}</h2></div>
    {{topics}}
  </div>
</template>

<script>
import { UiAlert, UiButton } from 'keen-ui';

import NavBar from './NavBar'
// import Links from './LandingPageView/Links'
// import Versions from './LandingPageView/Versions'
export default {
  data() {
    return {
      isConnected: undefined,
      data: undefined,
      topics: []
    }

  },
  methods: {
    openModal(ref) {
      this.$refs[ref].open();
    },
    closeModal(ref) {
      this.$refs[ref].close();
    },
    connectionSignal(op) {
      this.isConnected = op.success;
      this.data = op;
      this.topics=op.data[1].metadata;
    }
  },
  components: {
    NavBar,
    UiAlert,
    UiButton

  },
  name: 'home-page'
}

</script>
<style scoped>
  .card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  padding: 8px;
}
</style>
