import type { TableColumnData } from '@arco-design/web-vue'

export default [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'appName'
  },
  {
    title: '描述',
    dataIndex: 'appDesc'
  },
  {
    title: '图标',
    dataIndex: 'appIcon',
    slotName: 'appIcon'
  },
  {
    title: '应用类型',
    dataIndex: 'appType',
    slotName: 'appType'
  },
  {
    title: '评分策略',
    dataIndex: 'scoringStrategy',
    slotName: 'scoringStrategy'
  },
  {
    title: '审核状态',
    dataIndex: 'reviewStatus',
    slotName: 'reviewStatus'
  },
  {
    title: '审核信息',
    dataIndex: 'reviewMessage',
    slotName: 'reviewMessage'
  },
  {
    title: '审核时间',
    dataIndex: 'reviewTime',
    slotName: 'reviewTime'
  },
  {
    title: '审核人id',
    dataIndex: 'reviewerId'
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
