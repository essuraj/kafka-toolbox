<template>
  <div>
    <nav-bar v-on:status="connectionSignal"></nav-bar>
    <md-layout md-gutter
               v-show="isConnected ===true">
      <md-layout md-flex="20">
  
        <md-tabs md-centered  class="md-transparent">
          <md-tab id="movies"
                  md-label="Topics">
            <md-list class="md-dense">
              <md-subheader>Topics</md-subheader>
              <md-list-item v-for="(v,k) in topics"
                            @click.native="getTopic(k)">
                <span class="">
                <md-icon>device_hub</md-icon> {{k}}
              </span>
              </md-list-item>
            </md-list>
          </md-tab>
  
          <md-tab id="music"
                  md-label="Consumers">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>
  
        </md-tabs>
  
      </md-layout>
      <md-layout>
        <md-tabs md-left
                 class="md-transparent">
          <md-tab 
                  md-icon="grid_on">
                  <h1>Partitions</h1>
            <!--{{topics}} -->
            <!--<h2 class="md-headline">
                        {{partitionsCount}} partitions found</h2>-->
            <md-table>
              <md-table-header>
                <md-table-row>
                  <!--<md-table-head>Dessert (100g serving)</md-table-head>-->
                  <md-table-head>Partition</md-table-head>
                  <md-table-head>Leader</md-table-head>
                  <md-table-head>Replicas</md-table-head>
                  <md-table-head>ISR</md-table-head>
                </md-table-row>
              </md-table-header>
  
              <md-table-body>
                <md-table-row v-for="partition in selectedTopic"
                              :key="partition">
                  <md-table-cell>{{partition.partition}}</md-table-cell>
                  <md-table-cell>{{partition.leader}}</md-table-cell>
                  <md-table-cell>{{partition.replicas}}</md-table-cell>
                  <md-table-cell>{{partition.isr}}</md-table-cell>
                </md-table-row>
              </md-table-body>
            </md-table>
          </md-tab>
  
        </md-tabs>
      </md-layout>
    </md-layout>
  
  </div>
</template>

<script>
import { mdDialog } from 'vue-material';

import NavBar from './NavBar'
// import Links from './LandingPageView/Links'
// import Versions from './LandingPageView/Versions'
export default {
  data() {
    return {
      isConnected: undefined,
      data: undefined,
      topics: [],
      selectedTopic: []
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
      this.topics = op.data[1].metadata;
    },
    getTopic(key) {
      console.log(key)
      this.selectedTopic = this.topics[key];
    }
  },
  components: {
    NavBar,
    mdDialog
  },
  name: 'home-page'
}

</script>
<style scoped>

</style>
