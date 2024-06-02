import dayjs from 'dayjs'

export default (date: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(date).format(format)
}
