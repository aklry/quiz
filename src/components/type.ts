export interface IPictureUploadProps {
  biz: string
  onChange?: (url: string) => void
  value?: string
}

export interface IAppCardProps {
  app: API.AppVO
}