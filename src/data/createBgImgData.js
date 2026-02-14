import fs from 'fs'

const ImageData = []
for (let index = 1; index <= 50; index++) {
  ImageData.push({
    id: index,
    url: `/bgs/${index}.jpg`,
    alt: 'This is the alt',
    cats: ['lonely', 'tired', 'hungry'],
  })
}

const output = `const ImageData = [\n${ImageData.map((obj) => JSON.stringify(obj, null, 2)).join(',\n')}\n];`

fs.writeFile('output.js', output, (err) => {
  if (err) throw err
  console.log('Data written to file successfully!')
})
