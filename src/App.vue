<template>
  <div id="app">
    <div class="home-page">
      <div class="sign-content" v-if="bgUrl.indexOf(this.$route.path) >= 0">
        <div class="box-content">
          <div class="card container-content">
            <div class="sign-header">
              <img src="http://p57uimjto.bkt.clouddn.com/ykiat/logo.png@65" alt="易卡爱途-logo"/>
            </div>
            <router-view/>
          </div>
        </div>
      </div>
      <div class="manager-content" v-else>
        <router-view/>
      </div>
    </div>
      <ai-footer class="color-white" v-if="bgUrl.indexOf(this.$route.path) >= 0"></ai-footer>
      <ai-footer class="color-black" v-else></ai-footer>
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    margin:0;
    padding:0;
  }

  body, html {
    height: 100%;
  }

  .color-white {
    color: #fff;
  }

  .color-black {
    color: #000;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .h1 {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .index-container {
    height: calc(100vh - 69px);
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .sign-content {
    background: url(http://p57uimjto.bkt.clouddn.com/ykat/background-5.jpg@65) no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0;
    position: absolute;

    .box-content {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: calc(100% - 69px);
    }

    .container-content {
      margin: auto;
      text-align: center;

      .sign-header {
        margin: 25px;
        min-height: 36px;

        img {
          float: left;
          height: 36px;
        }
      }
    }

    .card {
      width: 432px;
      background: #fff;
      overflow: hidden;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
      box-sizing: border-box;
    }
  }

  /* 弹性布局flex */
  .sign-box {
    clear: left;
    padding: 0 40px 36px;
  }

  .sign-options {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    font-size: 14px;

    span {
      color: #409EFF;
      cursor: pointer;
    }
  }

</style>
