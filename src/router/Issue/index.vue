<template>
    <div class="issue">
        <h1>Support / Issues / Feature Requests</h1>
        <router-view :nextFunction="next"></router-view>
        <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>

</template>

<script>
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'
  import VueMarkdown from 'vue-markdown'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElFormItem,
      VueMarkdown},
    data () {
      return {
        info: this.$attrs.query,
        state: 'info'
      }
    },
    computed: {
      labels () {
        return this.githubLabels.map(function (val) {
          return val.toUpperCase()
        })
      },
      githubLabels () {
        var labels = []
        if (this.info.type === 'feature') {
          labels.push('feature request')
        } else {
          labels.push('bug')
        }
        if (this.info.area === 'ui') {
          labels.push('ui')
        } else if (this.info.area === 'indexers') {
          labels.push('indexer')
        } else if (this.info.area === 'releases') {
          labels.push('parser')
        } else if (this.info.area === 'clients') {
          labels.push('download client')
        }
        return labels
      },
      markdownBody () {
        var body = `\n**Description:** ${this.info.body}`
        body += `\n\n**Labels:** ${this.labels.join(', ')}`
        if (this.info.type !== 'feature') {
          body += `\n\n**Radarr Version:** ${this.info.version}\n\n**OS:** ${this.info.os}`
          if (this.info.os !== 'windows') {
            body += `\n\n**Mono Version:** ${this.info.monoVersion}`
          }
          if (this.info.area === 'ui') {
            body += `\n\n**Browser Version:** ${this.info.browserVersion}`
          }
          if (this.info.pasteUrl !== '' && this.info.pasteUrl !== undefined) {
            body += `\n\n**Debug Logs:** ${this.info.pasteUrl}`
          } else {
            body += `\n\n**Debug Logs:** ${this.info.logs}`
          }
        }
        return body
      },
      issueTitle () {
        var labels = this.labels.map(function (val) {
          return '[' + val + ']'
        })
        return `${labels.join('')} ${this.info.title}`
      }
    },
    methods: {
      next (state, data, callback) {
        switch (state) {
          case 'info':
            this.info = data
            this.state = 'related'
            this.info.logs = ''
            this.$router.push({path: 'related', query: this.info})
            break
          case 'related':
            if (this.info.type === 'feature') {
              this.state = 'submit'
              this.$router.push({path: 'submit', query: this.info})
            } else {
              this.state = 'common'
              this.$router.push({path: 'common', query: this.info})
            }
            break
          case 'common':
            this.state = 'submit'
            this.$router.push({path: 'submit', query: this.info})
        }
      }
    }
  }
</script>
