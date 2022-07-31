<template>
  <el-form
    :model="fromValue"
    label-width="60px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="key" prop="key">
      <el-input v-model="fromValue.key">
        <template #append>
          <el-button :icon="Refresh" @click="refreshKey">Refresh</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="url" prop="url">
      <el-input v-model="fromValue.url" />
    </el-form-item>

    <el-form-item label="有效期">
      <el-date-picker
        v-model="fromValue.expiration"
        type="datetime"
        class="date-picker"
        style="width: 100%"
        placeholder="选择过期时间，不选择则永久有效"
        :disabledDate="disabledDate"
        value-format="X"
      />
    </el-form-item>
    <el-form-item>
      <div class="text-center w-full">
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref, unref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import rules from './rules.data'
import { randomString } from '@/utils/utils'
const ruleFormRef = ref<FormInstance>()
const emits = defineEmits(['add'])
const fromValue = reactive<{
  key: string
  url: string
  expiration: null | number
}>({
  key: '',
  url: '',
  expiration: null
})

function refreshKey() {
  fromValue.key = randomString(6)
}
function disabledDate(date: Date) {
  // 只能选择今天和以后的日期
  return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
}
async function onSubmit() {
  if (!unref(ruleFormRef)) return
  await unref(ruleFormRef)?.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      emits('add', unref(fromValue))
    } else {
      console.log('error submit!', fields)
    }
  })
}
onMounted(() => {
  if (!fromValue.key) {
    refreshKey()
  }
})
defineExpose({ refreshKey })
</script>
<style lang="scss">
.date-picker {
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
