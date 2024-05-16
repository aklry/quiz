const { generateService } = require('@umijs/openapi')

generateService({
  requestLibPath: "import ryRequest from '@/services'",
  schemaPath: '',
  serversPath: './src',
})