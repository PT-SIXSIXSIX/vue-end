<template>
  <textarea id="editor">
    {{content}}
  </textarea>
</template>

<script>
  import $ from 'jquery'
  import Simditor from 'simditor'
  import 'simditor/styles/simditor.css'
  import globalConfig from '../config'

  export default {
    name: 'simditor',
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        editor: '',
      }
    },
    watch: {
      content(val) {
        this.editor.setValue(val)
      }
    },
    mounted() {
      /* eslint-disable no-new */
      this.editor = new Simditor({
        textarea: $('#editor'),
        upload: {
          url: globalConfig.nodeJsUrl + '/images',
          params: null,
          fileKey: 'image',
          connectionCount: 3,
          leaveConfirm: '文件上传中，确认离开此页面?'
        }
      });
      this.editor.on('valuechanged', (e, src) => {
        this.valueChange(e, src)
      })
    },
    methods: {
      valueChange(e, val) {
        this.$emit('change', this.editor.getValue())
      }
    }
  }
</script>


