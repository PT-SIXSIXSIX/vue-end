<template>
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
</template>

<style lang="scss">
  .home-footer {
    width: 100%;
    height: 21px;
    position: absolute;
    font-size: 13px;
    line-height: 21px;
    text-align: center;
    bottom: 0;
    padding: 24px 0;
    background-color: #f1f1f1;
  }

  .ykat-links {
    clear: both;
    display: block;
    color: inherit;

    ul {
      padding: 0;
      list-style-type: none;

      li {
        display: inline-block;
        vertical-align: middle;
        padding: 0 1em;
        line-height: 1em;
        border-left: 1px solid inherit;
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
</style>
