import type { TableColumnData } from '@arco-design/web-vue'

export default [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '选项',
    dataIndex: 'choices'
  },
  {
    title: '结果id',
    dataIndex: 'resultId'
  },
  {
    title: '名称',
    dataIndex: 'resultName'
  },
  {
    title: '描述',
    dataIndex: 'resultDesc'
  },
  {
    title: '图片',
    dataIndex: 'resultPicture',
    slotName: 'resultPicture'
  },
  {
    title: '得分',
    slotName: 'resultScore'
  },
  {
    title: '应用id',
    dataIndex: 'appId'
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
    title: '创建时间',
    dataIndex: 'createTime',
    slotName: 'createTime'
  },
  {
    title: '操作',
    slotName: 'operation'
  }
] as TableColumnData[]
