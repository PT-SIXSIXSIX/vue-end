<template>
  <div id="app">
    <div class="home-page">
      <div class="sign-content" v-if="homeUrl.indexOf(this.$route.path) >= 0">
        <div class="card container-content">
          <div class="sign-header">
            <img src="http://p57uimjto.bkt.clouddn.com/ykiat/logo.png@65" alt="易卡爱途-logo"/>
          </div>
          <router-view/>
        </div>
      </div>
      <div class="manager-content" v-else>
        <router-view/>
      </div>
    </div>
    <footer class="home-footer">
      <div class="ykat-links">
        <ul>
          <li><a target="_blank" href="javascript:void(0);">关于爱途</a></li>
          <li><a target="_blank" href="javascript:void(0);">服务协议</a></li>
          <li><a target="_blank" href="javascript:void(0);">常见问题</a></li>
          <li><a target="_blank" href="javascript:void(0);">客服中心</a></li>
          <li><a target="_blank" href="javascript:void(0);">联系邮箱</a></li>
          <li><p class="copyright">Copyright &copy; 2018 爱途. All Rights Reserved.</p></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: () => {
      return {
        homeUrl: [
          '/login', '/register',
          '/forgetPassword', '/updatePassword'
        ]
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

  a {
    text-decoration: none;
    color: inherit;
  }

  .home-footer {
    width: 100%;
    position: absolute;
    font-size: 13px;
    line-height: 21px;
    text-align: center;
    bottom: 20px;
    padding: 24px 0;
    color: #fff;

    .ykat-links {
      clear: both;
      display: block;

      ul {
        padding: 0;
        list-style-type: none;

        li {
          display: inline-block;
          vertical-align: middle;
          padding: 0 1em;
          line-height: 1em;
          border-left: 1px solid #fff;
        }

        li:first-child {
          border-left-width: 0;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        a:hover {
          text-decoration: underline;
          color: inherit;
        }
      }
    }
  }

  .home-page {
    background: url(http://p57uimjto.bkt.clouddn.com/ykat/background-5.jpg@65) no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0;
    position: absolute;

    .sign-content {
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

</style>
