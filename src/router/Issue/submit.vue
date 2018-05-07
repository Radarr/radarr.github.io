<template>
    <div>
        <h2>Ready to submit!</h2>
        <p>Below you can see a preview of your issue.</p>
        <el-row justify="center" type="flex">
            <el-col :span="12">
                <el-card class="issue-card">
                    <div slot="header" class="clearfix">
                                <span>
                                    {{issueTitle}}
                                </span>
                    </div>
                    <div class="issue-body">
                        <vue-markdown>{{markdownBody}}</vue-markdown>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row justify="center" type="flex" :gutter="20">
            <el-col :span="8" v-if="this.info.type === 'issue'">
                <el-card>
                    <div slot="header">
                        <h2>Support / Issues</h2>
                    </div>
                    <div>
                        <div class="submit-help">
                            <p>For support requests (e.g. downloads not working, files not being moved, permission issues, etc.), submit your issue to the Subreddit or the Discord</p>
                            <br>
                            <p>If you are not sure whether your issue is a bug or not, post it either to the Subreddit or the Discord first.</p>
                            <br>
                            <p>
                                <strong>Note: </strong>Clicking the Discord button should first copy the formatted issue text to your clipboard and then open Discord. If that does not work, try copying the formatted text below yourself and / or going to the support channel on our Discord yourself.
                            </p>
                            <br>
                            <p>
                                Click one of the buttons below to submit your issue report / support request to Discord or Reddit. Please do not alter any of the auto generated body, unless it is wrong.
                            </p>
                        </div>
                        <div class="submit-buttons">
                            <span class="reddit-button"><el-button type="primary" @click="submitReddit()"><font-awesome-icon :icon="['fab', 'reddit']" size="lg"/> <span>Submit on Reddit</span></el-button></span>
                            <span class="discord-button"><el-button type="primary" @click="submitDiscord()"><font-awesome-icon :icon="['fab', 'discord']" size="lg"/> <span>Submit on Discord</span></el-button></span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <h2>Bugs / Feature Requests</h2>
                    </div>
                    <div>
                        <div class="submit-help">
                            <p  v-if="this.info.type === 'issue'">Please only submit your issue to Github, if you are absolutely sure it's a bug. If you aren't sure, post it to the Subreddit or the Discord first.
                            </p>
                            <br  v-if="this.info.type === 'issue'">
                            <p  v-if="this.info.type === 'issue'">
                                <strong>Just because you received an exception doesn't mean it's a bug. Most exceptions are actually pointing out that something else is wrong.</strong>
                            </p>
                            <br  v-if="this.info.type === 'issue'">
                            <p>
                                Click the button below to submit your bug report / feature request to Github. Please do not alter any of the auto generated issue body, unless it is wrong.
                            </p>
                        </div>
                        <div class="submit-buttons">
                            <span class="github-button"><el-button type="default" @click="submitGithub()"><font-awesome-icon :icon="['fab', 'github']" size="lg"/> <span>Submit on Github</span></el-button></span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row justify="center" type="flex">
            <el-col :span="8">
                        <pre>
                            <code>{{markdownBody}}</code>
                        </pre>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon'
    export default {
      components: {
        FontAwesomeIcon,
        ElButton,
        VueMarkdown
      },
      props: ['nextFunction'],
      data () {
        return {
          info: this.$attrs.query
        }
      },
      computed: {
        markdownBody () {
          return this.$parent.markdownBody
        },
        issueTitle () {
          return this.$parent.issueTitle
        }
      },
      methods: {
        submitReddit () {
          //
          window.open('https://www.reddit.com/r/radarr/submit?selftext=true&title=' + encodeURIComponent(this.issueTitle) + '&text=' + encodeURIComponent(this.markdownBody), '_blank')
        },
        submitDiscord () {
          //
          // Create a dummy input to copy the string array inside it
          var dummy = document.createElement('textarea')
          // Add it to the document
          document.body.appendChild(dummy)
          // Set its ID
          dummy.setAttribute('id', 'dummy_id')
          // Output the array into it
          document.getElementById('dummy_id').value = this.markdownBody
          // Select it
          dummy.select()
          // Copy its contents
          document.execCommand('copy')
          // Remove it as its not needed anymore
          document.body.removeChild(dummy)
          window.open('https://discord.gg/rWPZCpQ', '_blank')
        },
        submitGithub () {
          //
          window.open('https://github.com/Radarr/Radarr/issues/new?title=' + encodeURIComponent(this.issueTitle) + '&body=' + encodeURIComponent(this.markdownBody) + '&labels=' + this.$parent.githubLabels.join(','), '_blank')
        }
      }
    }
</script>