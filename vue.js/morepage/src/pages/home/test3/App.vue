<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Test3</h1>
    <p v-for="(data) in listData" :key="data">
    <a-button  type="button" class="ant-btn ant-btn-primary">{{data}}</a-button>
    </p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      listData: [],
      title: ''
    }
  },
  created: function () {
    this.getListData()
  },
  methods: {
    getListData: function () {
      this.$http.post('/api/GetListData').then((response) => { this.listData = response.body })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
