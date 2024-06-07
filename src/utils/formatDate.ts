import dayjs from 'dayjs'

export default (date: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (!date) return ''
  return dayjs(date).format(format)
}
