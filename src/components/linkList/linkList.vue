<template>
  <div>
    <div class="flex justify-center" v-if="tableData.length === 0">
      <el-button @click="getData">获取</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="450"
      show-overflow-tooltip
      align="center"
      v-else
    >
      <el-table-column prop="key" label="路径" width="180" />
      <el-table-column prop="value" label="跳转URL">
        <template #default="scope">
          <a :href="scope.row.value" target="_blank" rel="noopener noreferrer">
            {{ scope.row.value }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="expiration" label="过期时间" width="180">
        <template #default="scope">
          <el-tag class="ml-2" type="success" v-if="!scope.row.expiration">
            <el-icon><Timer /></el-icon>永久有效
          </el-tag>
          <el-tag class="ml-2" type="danger" v-else>
            <el-icon><Timer /></el-icon>
            {{ dayjs.unix(scope.row.expiration).format('YYYY-MM-DD HH:mm:ss') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="right">
        <template #default="scope">
          <el-popconfirm
            title="确定删除这条记录嘛?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger"> Delete </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center mt-3">
      <el-button
        @click="getData"
        v-if="tableData.length > 0"
        :disabled="!hasMore"
        :loading="loading"
      >
        加载更多
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage, vLoading } from 'element-plus'
import { PropType, onMounted, ref } from 'vue'
import { dayjs } from 'element-plus'
const props = defineProps({
  api: {
    type: String as PropType<string>,
    required: true
  },
  password: {
    type: String as PropType<string>,
    required: true
  }
})
const tableData = ref<any[]>([])
const nextCursor = ref<string | null>(null)
const hasMore = ref(true)
const loading = ref(false)
function handleDelete(index: number, row: any) {
  axios
    .post(props.api, {
      key: row.key,
      password: props.password,
      type: 'delete'
    })
    .then(() => {
      tableData.value.splice(index, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.error('删除失败')
    })
}
async function getData() {
  try {
    loading.value = true
    const result = await axios.post(props.api, {
      password: props.password,
      type: 'list',
      cursor: nextCursor.value ? nextCursor.value : undefined
    })
    if (result.data.code !== 200) {
      ElMessage.error(result.data.msg)
    } else {
      if (result.data.data.list.length === 0) {
        return ElMessage.error('没有数据')
      }
      if (!result.data.data.cursor) {
        hasMore.value = false
      } else {
        nextCursor.value = result.data.data.cursor
      }
      tableData.value.push(...result.data.data.list)
    }
  } catch (e) {
  } finally {
    loading.value = false
  }
}
onMounted(() => {})
</script>
