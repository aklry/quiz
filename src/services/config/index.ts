const env = import.meta.env
let BASE_URL: string = 'http://localhost:8101/api'
if (env.PROD) {
  BASE_URL = env.VITE_API_URL
}
const TIME_OUT = 60000
export { BASE_URL, TIME_OUT }
