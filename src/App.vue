<template>
  <div id="app">
    <div class="home-page">
      <div class="sign-content" v-if="bgUrl.indexOf(this.$route.path) >= 0">
        <div class="box-content">
          <div class="card container-content">
            <router-view/>
          </div>
        </div>
      </div>
      <div class="manager-content" v-else>
        <router-view/>
      </div>
    </div>
      <ai-footer class="color-white" v-if="bgUrl.indexOf(this.$route.path) >= 0"></ai-footer>
      <ai-footer class="color-black" style="background-color: #f1f1f1;" v-else></ai-footer>
  </div>
</template>

<script>
  import globalConfig from './config'

  export default {
    name: 'App',
    data() {
      return {
        bgUrl: globalConfig.bgRouter
      }
    }
  }
</script>

<style lang="scss">
  @import './style/font-awesome.min.css';
  @import './style/common.scss';
</style>
