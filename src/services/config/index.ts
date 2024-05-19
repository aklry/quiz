const env = import.meta.env
let BASE_URL: string = 'http://quiz-backend.aklry.com:8101/api'
if (env.PROD) {
  BASE_URL = 'http://quiz-backend.aklry.com:8101/api'
}
const TIME_OUT = 10000
export { BASE_URL, TIME_OUT }
