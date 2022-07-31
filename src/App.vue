<template>
  <content-layout>
    <header-vue>
      <h2>小康的短链面板</h2>
    </header-vue>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="基础配置" name="setting">
        <link-setting
          v-model:api="setting.api"
          v-model:password="setting.password"
        />
      </el-collapse-item>
      <el-collapse-item title="添加链接" name="edit">
        <link-editor @add="addSite" ref="linkEditorRef" />
      </el-collapse-item>
      <el-collapse-item title="链接列表" name="list">
        <link-list :api="setting.api" :password="setting.password" />
      </el-collapse-item>
    </el-collapse>
  </content-layout>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import ContentLayout from '@/layout/content/index.vue'
import HeaderVue from './layout/header/header.vue'
import linkEditor from './components/linkEditor/linkEditor.vue'
import linkSetting from './components/linkSetting/linkSetting.vue'
import linkList from './components/linkList/linkList.vue'
import { ElMessage } from 'element-plus'
const activeName = ref('edit')
const linkEditorRef = ref<InstanceType<typeof linkEditor>>()
const setting = reactive({
  api: '',
  password: ''
})
async function addSite(value: {
  key: string
  url: string
  expiration?: number
}) {
  localStorage.setItem('setting', JSON.stringify(setting))
  try {
    const result = await axios.post(setting.api, {
      ...value,
      password: setting.password,
      type: 'add'
    })
    if (result.data.code !== 200) {
      ElMessage.error(result.data.msg)
    } else {
      ElMessage.success('添加成功')
      linkEditorRef.value?.refreshKey()
    }
  } catch (e) {
    ElMessage.error('发生了错误！')
  }
}
onMounted(() => {
  const localSetting = localStorage.getItem('setting')
  if (localSetting) {
    const { api, password } = JSON.parse(localSetting)
    setting.api = api
    setting.password = password
  }
})
</script>

<style scoped lang="scss"></style>
