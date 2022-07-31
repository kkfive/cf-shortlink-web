<template>
  <el-form :model="settingFromValue" label-width="70px" :rules="rules">
    <el-form-item label="API地址" props="api">
      <el-input v-model="settingFromValue.api" />
    </el-form-item>
    <el-form-item label="API密码" props="password">
      <el-input
        v-model="settingFromValue.password"
        type="password"
        show-password
      />
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, watch, PropType, onMounted } from 'vue'
import rules from './rules.data'
const emits = defineEmits(['update:api', 'update:password'])
const props = defineProps({
  api: {
    type: String as PropType<string>,
    default: ''
  },
  password: {
    type: String as PropType<string>,
    default: ''
  }
})
const settingFromValue = reactive({
  api: '',
  password: ''
})
watch(props, () => {
  settingFromValue.password = props.password
  settingFromValue.api = props.api
})
watch(settingFromValue, () => {
  emits('update:api', settingFromValue.api)
  emits('update:password', settingFromValue.password)
})
</script>
