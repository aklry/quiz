import type { TableColumnData } from '@arco-design/web-vue'

export default [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '账号',
    dataIndex: 'userAccount'
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    slotName: 'userName'
  },
  {
    title: '权限',
    dataIndex: 'userRole',
    slotName: 'userRole'
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    slotName: 'userAvatar'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    slotName: 'createTime'
  },
  {
    title: '操作',
    slotName: 'operation'
  }
] as TableColumnData[]
