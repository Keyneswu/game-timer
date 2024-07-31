<script setup>

import MainHeader from "@/components/parts/MainHeader.vue";
import MainFooter from "@/components/parts/MainFooter.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><MainHeader></MainHeader></el-header>
      <el-main><router-view/></el-main>
      <el-footer><main-footer></main-footer></el-footer>
    </el-container>
  </div>
</template>



<style scoped>

</style>
