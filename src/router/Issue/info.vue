<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="issue-form">
        <el-form-item label="I" prop="type">
            <el-select v-model="form.type" placeholder="...">
                <el-option label="have an issue" value="issue"></el-option>
                <el-option label="want a new feature" value="feature"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="form.type != ''" label="I have an issue with / feature request for" prop="area">
            <el-select v-model="form.area" placeholder="...">
                <el-option label="Indexers" value="indexers"></el-option>
                <el-option label="UI" value="ui"></el-option>
                <el-option label="Download Clients" value="clients"></el-option>
                <el-option label="Release Parsing / Matching / Downloading" value="releases"></el-option>
                <el-option label="Updating" value="updating"></el-option>
                <el-option label="Other" value="other"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-if="form.type != ''" label="Descriptive Title" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type != ''" label="Detailed description of request / issue." prop="body">
            <el-input type="textarea" v-model="form.body" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type == 'issue'" label="Radarr Version" prop="version">
            <el-input v-model="form.version"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 'issue'" label="OS" prop="os">
            <el-select v-model="form.os" placeholder="Please select your OS.">
                <el-option label="Windows" value="windows"></el-option>
                <el-option label="Linux" value="linux"></el-option>
                <el-option label="macOS" value="osx"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-if="form.os != 'windows' && form.type == 'issue'" label="Mono Version" prop="monoVersion">
            <el-input v-model="form.monoVersion"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type == 'issue' && form.area == 'ui'" label="Browser (with version info)" prop="browserVersion">
            <el-input v-model="form.browserVersion"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type == 'issue'" label="Log files" prop="logFiles">
            <span slot="label">Debug Log Files <el-popover
                    placement="top"
                    width="400"
                    trigger="hover">
                <div>
                    <p>We need the debug log files to be able to help you with your issue(s).
                        Please do not edit the debug logs after uploading them here and submit as many log files as you have.
                    </p>
                    <p>
                        If you do not have debug logging enabled, do so in Settings -> General -> Log Level.
                        Then let Radarr run until you encounter your issue and download the newly generated radarr.debug.txt.
                        Else, the debug logs won't have information about your issue in them.
                    </p>
                    <p>
                        If you feel debug logs are not necessary for your issue, upload normal logs and then add '|Debug|' at the end of the logs with the textfield below.
                    </p>
                </div>
                <span slot="reference"><i class="el-icon-question"></i></span>
            </el-popover></span>
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleLogsChange"
                    :file-list="form.logFiles"
                    :auto-upload="false"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div class="el-upload__tip" slot="tip">txt files</div>
            </el-upload>
        </el-form-item>
        <el-form-item v-if="form.type == 'issue'" label="Logs" prop="logs">
            <el-input type="textarea" v-model="form.logs" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type != ''">
            <el-button type="primary" @click="submitForm('form')" :loading="loadingNext">Next</el-button>
            <el-button @click="resetForm('form')">Reset</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    /* eslint-disable indent */
    import alite from 'alite'
    export default {
    props: [ 'nextFunction' ],
    data () {
      var browserVersion = function () {
        var ua = navigator.userAgent
        var tem
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || []
          return 'IE ' + (tem[1] || '')
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
          if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
        return M.join(' ')
      }
      return {
        form: {
          type: this.$attrs.query.type,
          title: this.$attrs.query.title,
          body: this.$attrs.query.body,
          area: this.$attrs.query.area,
          version: this.$attrs.query.version,
          os: this.$attrs.query.os,
          monoVersion: this.$attrs.query.monoVersion,
          browserVersion: browserVersion(),
          logFiles: [],
          logs: this.$attrs.query.logs
        },
        loadingNext: false
      }
    },
    computed: {
      rules () {
        return {
          title: [
            {type: 'string', required: true, trigger: 'change'}
          ],
          body: [
            {type: 'string', required: true, min: 150, trigger: 'change'}
          ],
          version: [
            {
              type: 'string',
              pattern: /^v?(\d+\.){3}\d+$/gi,
              required: true,
              message: 'Not a valid version.',
              trigger: 'change'
            }
          ],
          browserVersion: [
            {type: 'string', required: this.form.area === 'ui', trigger: 'blur'}
          ],
          monoVersion: [
            {type: 'string', required: this.form.os !== 'windows', trigger: 'change'}
          ],
          logs: [
            {type: 'string', required: true, pattern: /\|Debug\|/gi, message: 'Not valid debug logs.', trigger: 'blur'}
          ],
          os: [
            {type: 'enum', required: true, enum: ['windows', 'linux', 'osx']}
          ]
        }
      }
    },
    methods: {
        resetForm (formName) {
          this.$refs[formName].resetFields()
        },
        submitForm (formName) {
          let self = this
          self.loadingNext = true
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.form.type === 'feature') {
                self.nextFunction('info', self.form, function (e) {
                  self.loadingNext = false
                  console.log(e)
                })
              } else {
                alite({
                  url: 'https://api.paste.ee/v1/pastes',
                  method: 'POST',
                  data: {
                    'key': 'a6PaYdavsJRnEx4uG8aoCpEHqQ8uei14z3ewW6oyV',
                    'description': 'test',
                    'sections': [
                      {
                        'name': 'Radarr Log',
                        'syntax': 'verilog',
                        'contents': self.form.logs
                      }
                    ]
                  }
                }).then(function (result) {
                  console.log('GOT ', result)
                  self.form.pasteUrl = result.link
                  console.log(self)
                  self.nextFunction('info', self.form, function (e) {
                    self.loadingNext = false
                    console.log(e)
                  })
                }).catch(function (err) {
                  console.error(err)
                })
              }
            } else {
              self.loadingNext = false
              console.log('error submit!!')
              return false
            }
          })
        },
        handleLogsChange (file, fileList) {
          console.log(fileList)
          // eslint-disable-next-line no-unused-vars
          var temp = ''
          var times = 0
          var self = this
          var completion = function (content) {
            temp += content
            times += 1
            if (times === fileList.length) {
              self.form.logs = temp
              self.$refs['form'].validateField('logs')
            }
          }
          for (var i = 0; i < fileList.length; i++) {
            var f = fileList[i]
            console.log(f)
            if (!f.raw) {
              var request = new XMLHttpRequest()
              request.open('GET', f.url, true)
              request.withCredentials = true
              request.onload = function () {
                completion(request.response)
              }
              request.send()
            } else {
              var reader = new FileReader()
              reader.onload = function (e) {
                completion(e.target.result)
              }
              reader.onerror = function (e) {
                console.warn(e)
              }
              reader.readAsText(f.raw)
            }
          }
        }
    }
  }
</script>