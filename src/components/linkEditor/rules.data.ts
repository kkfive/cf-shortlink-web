export default {
  key: [{ required: true, message: 'Key不能为空哦！', trigger: 'blur' }],
  url: [{ required: true, message: '请输入URL', trigger: 'blur', type: 'url' }]
}
