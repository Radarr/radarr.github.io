<template>
    <div>
        <h2>Make sure your issue is not covered under common problems <a href="https://github.com/Radarr/Radarr/wiki/Common-Problems">here</a>.</h2>
        <p>Please also read through the FAQ <a href="https://github.com/Radarr/Radarr/wiki/FAQ">here</a>. Maybe Radarr works differently than you expect.</p>
        <div class="next-button">
            <el-button type="primary" @click="confirm()">I confirm that my issue is not listed on the wiki.</el-button>
        </div>
    </div>
</template>
<script>
    export default {
      props: ['nextFunction'],
      data () {
        return {
          info: this.$attrs.query
        }
      },
      computed: {
        markdownBody () {
          return this.$parent.markdownBody
        }
      },
      methods: {
        confirm () {
          this.nextFunction('common')
        }
      }
    }
</script>