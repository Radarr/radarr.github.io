<template>
        <div v-loading="loadingIssues" class="related-issues">
            <div v-if="relatedIssues.length > 0 || loadingIssues">
                <h2>We found some related issues / feature requests. Please make sure they do not cover yours.</h2>
                <p>If one of these issues does cover yours as well, please post the comment below or, if it does not provide new information, add the thumbs up emoji to the parent comment.</p>
                <el-row justify="center" type="flex">
                    <el-col :span="8">
                        <pre>
                            <code>{{markdownBody}}</code>
                        </pre>
                    </el-col>
                </el-row>

                <el-row v-for="group in relatedIssues" :gutter="20">
                    <el-col :span="8" v-for="issue in group">
                        <el-card class="issue-card">
                            <div slot="header" class="clearfix">
                                <span>
                                    <el-tag v-if="issue.state == 'open'" type="success">Open</el-tag><el-tag v-if="issue.state == 'closed'" type="danger">Closed</el-tag>
                                     {{issue.title}} (<a :href="issue.html_url" target="_blank">#{{issue.number}}</a>)
                                </span>
                            </div>
                            <div class="issue-body">
                                <vue-markdown>{{issue.body}}</vue-markdown>
                            </div>
                        </el-card>
                    </el-col>

                </el-row>
                <div class="next-button">
                    <el-button type="primary" @click="confirmIssues()">I confirm that no existing issues were reported.</el-button>
                </div>
            </div>

        </div>
</template>
<script>
    import GitHub from 'github-api'
    import VueMarkdown from 'vue-markdown'
    import ElCol from 'element-ui/packages/col/src/col'
    export default {
      props: ['nextFunction'],
      components: {
        ElCol,
        VueMarkdown
      },
      data () {
        return {
          relatedIssues: [],
          loadingIssues: true,
          info: this.$attrs.query
        }
      },
      computed: {
        markdownBody () {
          return this.$parent.markdownBody
        }
      },
      created () {
        // fetch the data when the view is created and the data is
        // already being observed
        const gh = new GitHub()
        let self = this
        let search = gh.search()
        search.forIssues({
          q: `${this.info.title}+repo:Radarr/Radarr`
        }).then(function ({data}) {
          var subset = data.slice(0, 6)
          var i
          var j
          var temparray = []
          var chunk = 3
          for (i = 0, j = subset.length; i < j; i += chunk) {
            temparray.push(subset.slice(i, i + chunk))
            // do whatever
          }
          console.log(temparray)
          self.relatedIssues = temparray
          self.loadingIssues = false
          console.log(self.relatedIssues)
          if (self.relatedIssues.length === 0) {
            self.confirmIssues()
          }
        })
      },
      methods: {
        confirmIssues () {
          this.nextFunction('related')
        }
      }
    }
</script>