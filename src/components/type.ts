import type { TableColumnData, PaginationProps } from '@arco-design/web-vue'

export interface IPictureUploadProps {
  biz: string
  onChange?: (url: string) => void
  value?: string
}

export interface IAppCardProps {
  app: API.AppVO
}

export interface ICommonTableProps {
  columns: TableColumnData[]
  data: any[]
  paginationProps: boolean | PaginationProps
}
