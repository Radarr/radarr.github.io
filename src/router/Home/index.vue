<template>
  <el-carousel :interval="4000" type="" height="600px">
    <el-carousel-item v-for="item in 6" :key="item">
      <el-card :body-style="{ padding: '20px' }">

        <div style="padding: 14px;">
          <span>Yummy hamburger</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">Operating button</el-button>
          </div>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Hello from '~components/Hello'

  @Component({
    components: {
      Hello
    }
  })
  export default class HomeRoute extends Vue {
    hello () {
      this.$message('Hello Vue')
    }
  }
</script>
