<template>
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
</template>

<style lang="scss">
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
