import type { TableColumnData } from '@arco-design/web-vue'

export default [
  {
    title: 'id',
    dataIndex: 'id'
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
    title: '结果属性',
    dataIndex: 'resultProp'
  },
  {
    title: '评分范围',
    dataIndex: 'resultScoreRange'
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
    title: '操作',
    slotName: 'operation'
  }
] as TableColumnData[]
