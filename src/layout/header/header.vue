<template>
  <div class="flex justify-between">
    <div>
      <slot name="prefix"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
    <div name="suffix"></div>
  </div>
  <el-divider>
    <el-icon><star-filled /></el-icon>
  </el-divider>
</template>
<script setup lang="ts">
import { StarFilled } from '@element-plus/icons-vue'
</script>
