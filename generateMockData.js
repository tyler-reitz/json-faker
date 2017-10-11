const util = require('util')
const fs = require('fs')
const jsf = require('json-schema-faker')
const schema = require('./mockSchema')

const writeFile = util.promisify(fs.writeFile)

jsf.extend('faker', function() {
  const faker = require('faker')
  return faker
})

const generateMockData = async () => {
  try {
    const mockData = await jsf.resolve(schema)
    const toJson = JSON.stringify(mockData)
    await writeFile('./src/api/db.json', toJson)
    console.log('finished!')
  } catch (e) {
    console.log(e)
  }
}

generateMockData()
