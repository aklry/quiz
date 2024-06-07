import type { TableColumnData } from '@arco-design/web-vue'

export default [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '题目内容',
    dataIndex: 'questionContent'
  },
  {
    title: '应用id',
    dataIndex: 'appId'
  },
  {
    title: '用户id',
    dataIndex: 'userId'
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
